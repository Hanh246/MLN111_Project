import React, { useState, useEffect } from 'react';
import './VideoWidget.css';
import { getLessonVideo } from '../data/videoData';
import monthlyThemes from '../data/monthlyThemes';

const VideoWidget = ({ month }) => {
    const [isVisible, setIsVisible] = useState(false);
    const videoId = getLessonVideo(month);
    
    // Get theme title for the header, truncated if too long
    const theme = monthlyThemes.find(t => t.month === month)?.theme || "Bài giảng triết học";
    const shortTitle = theme.length > 40 ? theme.substring(0, 40) + '...' : theme;

    const toggleVideo = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            {/* Toggle Button */}
            {!isVisible && (
                <button 
                    className="video-toggle-btn" 
                    onClick={toggleVideo}
                    title="Mở góc học tập Video"
                >
                    <span role="img" aria-label="tv">📺</span> 
                    Video Bài Giảng
                </button>
            )}

            {/* Video Container */}
            <div className={`video-box ${isVisible ? 'visible' : 'hidden'}`}>
                <div className="video-header">
                    <span className="video-title" title={theme}>
                        🎥 {shortTitle}
                    </span>
                    <span 
                        className="close-video" 
                        onClick={() => setIsVisible(false)}
                        title="Đóng video"
                    >
                        &times;
                    </span>
                </div>
                
                <div className="video-responsive">
                    <iframe 
                        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`} 
                        title="Bài giảng Triết học"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </>
    );
};

export default VideoWidget;
