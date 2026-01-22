import { useState, useRef, useEffect } from 'react';
import aiService from '../utils/aiService';
import { IoSend, IoClose, IoChatbubbleEllipses } from 'react-icons/io5';
import './ChatBot.css';

function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            text: 'Xin chào! Tôi là trợ lý AI về triết học Mác-Lênin. Bạn có câu hỏi gì không? 😊',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputText.trim() || isTyping) return;

        const userMessage = inputText.trim();
        setInputText('');

        // Add user message
        setMessages(prev => [...prev, {
            role: 'user',
            text: userMessage,
            timestamp: new Date()
        }]);

        // Show typing indicator
        setIsTyping(true);

        // Get AI response
        const response = await aiService.sendMessage(userMessage);

        setIsTyping(false);

        if (response.success) {
            setMessages(prev => [...prev, {
                role: 'ai',
                text: response.message,
                timestamp: new Date()
            }]);
        } else {
            setMessages(prev => [...prev, {
                role: 'ai',
                text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.',
                timestamp: new Date()
            }]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button className="chat-fab" onClick={() => setIsOpen(true)} title="Hỏi AI">
                    <IoChatbubbleEllipses />
                    <span className="chat-pulse"></span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window">
                    {/* Header */}
                    <div className="chat-header">
                        <div className="chat-avatar">🤖</div>
                        <div className="chat-info">
                            <h4>AI Triết Học</h4>
                            <p>Trợ lý Mác-Lênin</p>
                        </div>
                        <button className="chat-close" onClick={() => setIsOpen(false)}>
                            <IoClose />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.role}`}>
                                <div className="message-bubble">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message ai">
                                <div className="message-bubble typing">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="chat-input-container">
                        <textarea
                            className="chat-input"
                            placeholder="Nhập câu hỏi của bạn..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            rows="1"
                            disabled={isTyping}
                        />
                        <button
                            className="chat-send-btn"
                            onClick={handleSendMessage}
                            disabled={!inputText.trim() || isTyping}
                        >
                            <IoSend />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatBot;
