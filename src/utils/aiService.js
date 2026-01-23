// AI Service - Gemini API Integration (Optimized)

// API Configuration with environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Configuration constants
const CONFIG = {
    maxHistoryPairs: 10, // Giới hạn 10 cặp tin nhắn (20 messages total)
    maxRetries: 3, // Số lần retry tối đa
    timeout: 30000, // 30 giây timeout
    retryDelay: 1000, // Delay ban đầu cho retry (ms)
    generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 500,
    }
};

class AIService {
    constructor() {
        this.systemPrompt = `Bạn là một trợ lý AI chuyên về triết học Mác-Lênin. 
Nhiệm vụ của bạn là giải đáp các câu hỏi về triết học Mác-Lênin một cách rõ ràng, dễ hiểu.
Hãy trả lời ngắn gọn, súc tích, dùng ví dụ cụ thể khi cần thiết.
Luôn lịch sự và khuyến khích người học.`;
        this.conversationHistory = [];
        this.validateApiKey();
    }

    /**
     * Validate API key on initialization
     */
    validateApiKey() {
        if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
            console.error('❌ Gemini API key chưa được cấu hình!');
            console.error('Vui lòng tạo file .env và thêm: VITE_GEMINI_API_KEY=your_api_key');
            throw new Error('API key không hợp lệ');
        }
    }

    /**
     * Trim conversation history to maintain memory limit
     */
    trimHistory() {
        const maxMessages = CONFIG.maxHistoryPairs * 2;
        if (this.conversationHistory.length > maxMessages) {
            // Giữ lại N tin nhắn gần nhất
            this.conversationHistory = this.conversationHistory.slice(-maxMessages);
            console.log(`📝 Đã trim lịch sử xuống còn ${maxMessages} tin nhắn`);
        }
    }

    /**
     * Send message to Gemini AI with retry mechanism
     */
    async sendMessage(userMessage) {
        try {
            // Call API with retry logic
            const response = await this.retryWithBackoff(() => 
                this.callGeminiAPI(userMessage)
            );

            return response;

        } catch (error) {
            console.error('AI Service Error:', error);
            return this.handleError(error);
        }
    }

    /**
     * Call Gemini API with proper system instruction
     */
    async callGeminiAPI(userMessage) {
        // Add user message to history
        this.conversationHistory.push({
            role: 'user',
            parts: [{ text: userMessage }]
        });

        // Prepare request with system instruction
        const requestBody = {
            system_instruction: {
                parts: [{ text: this.systemPrompt }]
            },
            contents: this.conversationHistory,
            generationConfig: CONFIG.generationConfig
        };

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeout);

        try {
            // Call Gemini API
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json();
                throw this.parseAPIError(response.status, errorData);
            }

            const data = await response.json();

            // Extract AI response
            const aiMessage = data.candidates[0].content.parts[0].text;

            // Add AI response to history
            this.conversationHistory.push({
                role: 'model',
                parts: [{ text: aiMessage }]
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
                console.error(`❌ Đã thử ${CONFIG.maxRetries} lần nhưng vẫn lỗi`);
                throw error;
            }

            // Calculate delay with exponential backoff
            const delay = CONFIG.retryDelay * Math.pow(2, retryCount);
            console.log(`⏳ Retry lần ${retryCount + 1}/${CONFIG.maxRetries} sau ${delay}ms...`);

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

        console.error(`❌ API Error [${error.type}]:`, errorData);
        return error;
    }

    /**
     * Handle errors and return user-friendly messages
     */
    handleError(error) {
        let userMessage = 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.';

        switch (error.type) {
            case 'INVALID_API_KEY':
                userMessage = '❌ API key không hợp lệ. Vui lòng kiểm tra cấu hình.';
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
        console.log('🗑️ Đã xóa lịch sử hội thoại');
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
