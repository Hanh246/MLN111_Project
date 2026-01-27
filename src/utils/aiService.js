// AI Service - Groq API via Backend Proxy
// Frontend makes requests to local backend server or production backend
// Backend handles API key security and Groq API communication

// Development logging utility - only logs in dev mode
const isDev = import.meta.env.DEV;
const devLog = (...args) => isDev && console.log(...args);
const devWarn = (...args) => isDev && console.warn(...args);
const devError = (...args) => isDev && console.error(...args);

// Configuration constants
const CONFIG = {
    maxHistoryPairs: 10,
    maxRetries: 3,
    timeout: 30000,
    retryDelay: 1000,
};

// Determine API URL based on environment
// In production, this should be set to the Render backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class AIService {
    constructor() {
        this.systemPrompt = `Bạn là một trợ lý AI chuyên về triết học Mác-Lênin. 
Nhiệm vụ của bạn là giải đáp các câu hỏi về triết học Mác-Lênin một cách rõ ràng, dễ hiểu.
Hãy trả lời ngắn gọn, súc tích, dùng ví dụ cụ thể khi cần thiết.
Luôn lịch sự và khuyến khích người học.`;
        this.conversationHistory = [];
        this.pendingRequests = new Set(); // Track pending requests to prevent duplicates
    }

    /**
     * Trim conversation history to maintain memory limit
     */
    trimHistory() {
        const maxMessages = CONFIG.maxHistoryPairs * 2;
        if (this.conversationHistory.length > maxMessages) {
            // Giữ lại N tin nhắn gần nhất
            this.conversationHistory = this.conversationHistory.slice(-maxMessages);
            devLog(`📝 Đã trim lịch sử xuống còn ${maxMessages} tin nhắn`);
        }
    }

    /**
     * Send message to Groq AI via backend proxy with retry mechanism
     */
    async sendMessage(userMessage) {
        // Prevent duplicate requests
        const messageKey = userMessage.trim().toLowerCase();
        
        if (this.pendingRequests.has(messageKey)) {
            devWarn('⚠️ Duplicate request detected, skipping...');
            return {
                success: false,
                message: '⏳ Đang xử lý câu hỏi này, vui lòng đợi...',
                errorType: 'DUPLICATE_REQUEST'
            };
        }

        this.pendingRequests.add(messageKey);

        try {
            // Call Groq API via backend with retry logic
            const response = await this.retryWithBackoff(() => 
                this.callGroqAPI(userMessage)
            );

            return response;

        } catch (error) {
            devError('AI Service Error:', error);
            return this.handleError(error);
        } finally {
            // Always remove from pending requests
            this.pendingRequests.delete(messageKey);
        }
    }

    /**
     * Call backend proxy which communicates with Groq API
     */
    async callGroqAPI(userMessage) {
        // Add user message to history
        this.conversationHistory.push({
            role: 'user',
            content: userMessage
        });

        // Prepare messages array with system prompt
        const messages = [
            {
                role: 'system',
                content: this.systemPrompt
            },
            ...this.conversationHistory
        ];

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeout);

        try {
            // Call backend proxy (which forwards to Groq API)
            devLog(`Connecting to backend: ${API_BASE_URL}/api/chat`);
            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw this.parseAPIError(response.status, errorData);
            }

            const data = await response.json();

            // Extract AI response
            const aiMessage = data.choices[0].message.content;

            // Add AI response to history
            this.conversationHistory.push({
                role: 'assistant',
                content: aiMessage
            });

            // Trim history to maintain memory limit
            this.trimHistory();

            return {
                success: true,
                message: aiMessage
            };

        } catch (error) {
            // Remove the failed user message from history
            this.conversationHistory.pop();
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    /**
     * Retry with exponential backoff
     */
    async retryWithBackoff(fn, retryCount = 0) {
        try {
            return await fn();
        } catch (error) {
            // Don't retry for certain errors
            if (error.type === 'INVALID_API_KEY' || error.type === 'INVALID_REQUEST') {
                throw error;
            }

            // Check if we should retry
            if (retryCount >= CONFIG.maxRetries) {
                devError(`❌ Đã thử ${CONFIG.maxRetries} lần nhưng vẫn lỗi`);
                throw error;
            }

            // Calculate delay with exponential backoff
            const delay = CONFIG.retryDelay * Math.pow(2, retryCount);
            devLog(`⏳ Retry lần ${retryCount + 1}/${CONFIG.maxRetries} sau ${delay}ms...`);

            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, delay));

            // Retry
            return this.retryWithBackoff(fn, retryCount + 1);
        }
    }

    /**
     * Parse API error to specific error types
     */
    parseAPIError(status, errorData) {
        const error = new Error();
        error.originalError = errorData;

        switch (status) {
            case 400:
                error.type = 'INVALID_REQUEST';
                error.message = 'Yêu cầu không hợp lệ';
                break;
            case 401:
            case 403:
                error.type = 'INVALID_API_KEY';
                error.message = 'API key không hợp lệ hoặc đã hết hạn';
                break;
            case 429:
                error.type = 'RATE_LIMIT';
                error.message = 'Đã vượt quá giới hạn số lần gọi API';
                break;
            case 500:
            case 503:
                error.type = 'SERVER_ERROR';
                error.message = 'Lỗi server, vui lòng thử lại sau';
                break;
            default:
                error.type = 'UNKNOWN_ERROR';
                error.message = `Lỗi API: ${status}`;
        }

        devError(`❌ API Error [${error.type}]:`, errorData);
        return error;
    }

    /**
     * Handle errors and return user-friendly messages
     */
    handleError(error) {
        let userMessage = 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.';

        switch (error.type) {
            case 'INVALID_API_KEY':
                userMessage = '❌ Server chưa cấu hình API key. Vui lòng liên hệ admin.';
                break;
            case 'RATE_LIMIT':
                userMessage = '⏸️ Bạn đã hỏi quá nhiều câu hỏi. Vui lòng đợi vài phút rồi thử lại.';
                break;
            case 'SERVER_ERROR':
                userMessage = '🔧 Server đang bận, vui lòng thử lại sau ít phút.';
                break;
            case 'NETWORK_ERROR':
                userMessage = '📶 Lỗi kết nối mạng. Vui lòng kiểm tra internet và thử lại.';
                break;
        }

        if (error.name === 'AbortError') {
            userMessage = '⏱️ Yêu cầu đã hết thời gian chờ. Vui lòng thử lại.';
        }
        
        // Handle fetch errors (network down, cors, etc)
        if (error.message.includes('Failed to fetch')) {
             userMessage = '❌ Không thể kết nối tới server. Vui lòng kiểm tra server backend đã chạy chưa.';
        }

        return {
            success: false,
            message: userMessage,
            error: error.message,
            errorType: error.type
        };
    }

    /**
     * Clear conversation history
     */
    clearHistory() {
        this.conversationHistory = [];
        devLog('🗑️ Đã xóa lịch sử hội thoại');
    }

    /**
     * Get conversation history
     */
    getHistory() {
        return this.conversationHistory;
    }

    /**
     * Get history statistics
     */
    getStats() {
        return {
            messageCount: this.conversationHistory.length,
            maxMessages: CONFIG.maxHistoryPairs * 2,
            usagePercentage: (this.conversationHistory.length / (CONFIG.maxHistoryPairs * 2) * 100).toFixed(1)
        };
    }
}

// Export singleton instance
const aiService = new AIService();
export default aiService;