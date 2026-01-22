// AI Service - Gemini API Integration
const GEMINI_API_KEY = 'AIzaSyAB5No64dLChv-0w6kf-oLMzapcc-wcey0';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';

class AIService {
    constructor() {
        this.systemPrompt = `Bạn là một trợ lý AI chuyên về triết học Mác-Lênin. 
Nhiệm vụ của bạn là giải đáp các câu hỏi về triết học Mác-Lênin một cách rõ ràng, dễ hiểu.
Hãy trả lời ngắn gọn, súc tích, dùng ví dụ cụ thể khi cần thiết.
Luôn lịch sự và khuyến khích người học.`;
        this.conversationHistory = [];
    }

    async sendMessage(userMessage) {
        try {
            // Build contents array with system prompt on first message
            let contents = [];
            
            if (this.conversationHistory.length === 0) {
                // First message - include system prompt
                contents.push({
                    role: 'user',
                    parts: [{text: this.systemPrompt + '\n\n' + userMessage}]
                });
            } else {
                // Subsequent messages - add history
                contents = [...this.conversationHistory];
                contents.push({
                    role: 'user',
                    parts: [{text: userMessage}]
                });
            }

            // Prepare request
            const requestBody = {
                contents: contents,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 500,
                }
            };

            // Call Gemini API
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            
            // Extract AI response
            const aiMessage = data.candidates[0].content.parts[0].text;

            // Update conversation history
            this.conversationHistory.push({
                role: 'user',
                parts: [{text: userMessage}]
            });
            this.conversationHistory.push({
                role: 'model',
                parts: [{text: aiMessage}]
            });

            return {
                success: true,
                message: aiMessage
            };

        } catch (error) {
            console.error('AI Service Error:', error);
            return {
                success: false,
                message: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.',
                error: error.message
            };
        }
    }

    clearHistory() {
        this.conversationHistory = [];
    }

    getHistory() {
        return this.conversationHistory;
    }
}

// Export singleton instance
const aiService = new AIService();
export default aiService;
