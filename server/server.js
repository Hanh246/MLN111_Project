import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Simple in-memory rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20; // 20 requests per minute

const rateLimiter = (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    
    if (!rateLimitMap.has(clientIP)) {
        rateLimitMap.set(clientIP, []);
    }
    
    const requests = rateLimitMap.get(clientIP);
    
    // Remove old requests outside the window
    const validRequests = requests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
    
    if (validRequests.length >= MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({
            error: 'Rate limit exceeded',
            message: `Bạn đã gửi quá nhiều yêu cầu. Vui lòng đợi ${Math.ceil(RATE_LIMIT_WINDOW / 1000)}s.`,
            retryAfter: Math.ceil((validRequests[0] + RATE_LIMIT_WINDOW - now) / 1000)
        });
    }
    
    validRequests.push(now);
    rateLimitMap.set(clientIP, validRequests);
    
    // Cleanup old entries periodically
    if (rateLimitMap.size > 1000) {
        for (const [ip, timestamps] of rateLimitMap.entries()) {
            const valid = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
            if (valid.length === 0) {
                rateLimitMap.delete(ip);
            }
        }
    }
    
    next();
};

// Apply rate limiting to chat endpoint only
app.use('/api/chat', rateLimiter);

// Request logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        service: 'Groq AI Proxy',
        model: 'llama-3.3-70b-versatile'
    });
});

// Main chat endpoint with enhanced error handling
app.post('/api/chat', async (req, res) => {
    try {
        // Validate request body
        if (!req.body || !req.body.messages) {
            return res.status(400).json({ 
                error: 'Invalid request',
                message: 'Missing messages array' 
            });
        }

        const messages = req.body.messages;

        // Validate messages array
        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ 
                error: 'Invalid request',
                message: 'Messages must be a non-empty array' 
            });
        }

        // Validate API key exists
        if (!process.env.GROQ_API_KEY) {
            console.error('❌ GROQ_API_KEY not found in environment variables');
            return res.status(500).json({ 
                error: 'Configuration error',
                message: 'API key not configured' 
            });
        }

        // Prepare request to Groq
        const requestBody = {
            model: "llama-3.3-70b-versatile",
            messages: messages,
            temperature: 0.7,
            max_tokens: 1500, // Increased for longer responses
            top_p: 0.9,
            stream: false
        };

        console.log(`📤 Sending request to Groq (${messages.length} messages)`);

        // Call Groq API
        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
                },
                body: JSON.stringify(requestBody)
            }
        );

        // Handle non-200 responses
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('❌ Groq API Error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData
            });
            
            return res.status(response.status).json({
                error: 'API request failed',
                message: errorData.error?.message || 'Unknown error from Groq API',
                details: errorData
            });
        }

        const data = await response.json();
        
        // Log success with token usage
        if (data.usage) {
            console.log(`✅ Response received (tokens: ${data.usage.total_tokens})`);
        }

        // Validate response structure
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return res.json(data);
        } else {
            console.warn('⚠️ Unexpected response structure:', data);
            return res.json({
                choices: [{
                    message: {
                        content: 'Xin lỗi, phản hồi từ AI không hợp lệ. Vui lòng thử lại.',
                        role: 'assistant'
                    }
                }]
            });
        }

    } catch (err) {
        // Detailed error logging
        console.error('❌ Server Error:', {
            message: err.message,
            stack: err.stack,
            name: err.name
        });

        // Check for specific error types
        if (err.name === 'AbortError') {
            return res.status(504).json({ 
                error: 'Request timeout',
                message: 'Yêu cầu đã hết thời gian chờ' 
            });
        }

        if (err.code === 'ECONNREFUSED') {
            return res.status(503).json({ 
                error: 'Service unavailable',
                message: 'Không thể kết nối đến Groq API' 
            });
        }

        // Generic error response
        return res.status(500).json({ 
            error: 'Internal server error',
            message: 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.'
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not found',
        message: `Route ${req.method} ${req.path} not found` 
    });
});

// Validate environment variables on startup
if (!process.env.GROQ_API_KEY) {
    console.error(`
╔════════════════════════════════════════════════════════╗
║  ❌ CONFIGURATION ERROR                               ║
║                                                        ║
║  Missing GROQ_API_KEY in environment variables        ║
║  Please create a .env file with:                      ║
║  GROQ_API_KEY=your_api_key_here                       ║
║                                                        ║
║  Get your free API key at:                            ║
║  https://console.groq.com/keys                        ║
╚════════════════════════════════════════════════════════╝
    `.trim());
    process.exit(1);
}

// Start server
const server = app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║  ✅ Backend Server Started                            ║
║  🌐 URL: http://localhost:${PORT}                     ║
║  🤖 AI Provider: Groq (FAST & FREE)                   ║
║  📦 Model: llama-3.3-70b-versatile                    ║
║  ⚡ Status: Ready to handle requests                  ║
║  🛡️  Rate Limit: ${MAX_REQUESTS_PER_WINDOW} req/min                           ║
╚════════════════════════════════════════════════════════╝
    `.trim());
});

// Graceful shutdown handler
const gracefulShutdown = (signal) => {
    console.log(`\n⚠️  Received ${signal}. Starting graceful shutdown...`);
    
    server.close(() => {
        console.log('✅ Server closed. All connections terminated.');
        process.exit(0);
    });
    
    // Force shutdown after 10 seconds
    setTimeout(() => {
        console.error('❌ Forced shutdown after timeout');
        process.exit(1);
    }, 10000);
};

// Listen to shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

