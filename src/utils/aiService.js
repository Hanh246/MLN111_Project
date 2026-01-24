// AI Service - Groq API Integration (Optimized for Philosophy Project)

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const CONFIG = {
    model: "llama-3.3-70b-versatile", // Model mạnh mẽ nhất hiện nay của Groq, rất giỏi lập luận triết học
    maxHistoryPairs: 10,
    maxRetries: 3,
    timeout: 30000,
    retryDelay: 1000,
    temperature: 0.7, // Giữ độ linh hoạt cho các câu hỏi về biện chứng
    max_tokens: 1024
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

    validateApiKey() {
        if (!GROQ_API_KEY) {
            console.error('❌ Groq API key chưa được cấu hình!');
            throw new Error('API key không hợp lệ');
        }
    }

    async sendMessage(userMessage) {
        try {
            return await this.retryWithBackoff(() => this.callGroqAPI(userMessage));
        } catch (error) {
            console.error('Groq Service Error:', error);
            return this.handleError(error);
        }
    }

    async callGroqAPI(userMessage) {
        // Chuẩn bị danh sách tin nhắn theo chuẩn OpenAI
        const messages = [
            { role: "system", content: this.systemPrompt },
            ...this.conversationHistory,
            { role: "user", content: userMessage }
        ];

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeout);

        try {
            const response = await fetch(GROQ_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: CONFIG.model,
                    messages: messages,
                    temperature: CONFIG.temperature,
                    max_tokens: CONFIG.max_tokens
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json();
                throw this.parseAPIError(response.status, errorData);
            }

            const data = await response.json();
            const aiMessage = data.choices[0].message.content;

            // Cập nhật lịch sử hội thoại
            this.conversationHistory.push({ role: "user", content: userMessage });
            this.conversationHistory.push({ role: "assistant", content: aiMessage });

            // Cắt bớt lịch sử nếu quá dài
            if (this.conversationHistory.length > CONFIG.maxHistoryPairs * 2) {
                this.conversationHistory = this.conversationHistory.slice(-CONFIG.maxHistoryPairs * 2);
            }

            return { success: true, message: aiMessage };

        }  finally {
            clearTimeout(timeoutId);
        }
    }

    async retryWithBackoff(fn, retryCount = 0) {
        try {
            return await fn();
        } catch (error) {
            if (status === 401 || status === 400 || retryCount >= CONFIG.maxRetries) throw error;
            const delay = CONFIG.retryDelay * Math.pow(2, retryCount);
            await new Promise(resolve => setTimeout(resolve, delay));
            return this.retryWithBackoff(fn, retryCount + 1);
        }
    }

    parseAPIError(status, errorData) {
        const error = new Error(errorData.error?.message || 'Unknown API Error');
        error.status = status;
        if (status === 429) error.type = 'RATE_LIMIT';
        if (status === 401) error.type = 'INVALID_API_KEY';
        return error;
    }

    handleError(error) {
        let msg = 'Có lỗi xảy ra, vui lòng thử lại.';
        if (error.type === 'RATE_LIMIT') msg = 'Hạn mức yêu cầu đã hết, vui lòng đợi một chút.';
        if (error.type === 'INVALID_API_KEY') msg = 'API Key của Groq không chính xác.';
        return { success: false, message: msg, error: error.message };
    }

    clearHistory() {
        this.conversationHistory = [];
    }
}

const aiService = new AIService();
export default aiService;