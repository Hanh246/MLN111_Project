import { memo, useEffect, useState } from 'react';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { useReflection } from '../hooks/useReflection';
import './DailyReflection.css';

/**
 * Component for daily reflection/journal
 */
const DailyReflection = memo(function DailyReflection({ currentDate }) {
  const { reflection, saveReflection, lastSaved } = useReflection(currentDate);
  const [showSaved, setShowSaved] = useState(false);

  // Show "Saved" message briefly after saving
  useEffect(() => {
    if (lastSaved) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastSaved]);

  const handleChange = (e) => {
    saveReflection(e.target.value);
  };

  return (
    <div className="reflection-container">
      <h3 className="reflection-title">
        <IoChatbubbleEllipses className="section-icon" /> Suy Ngẫm Hôm Nay
      </h3>
      <p className="reflection-prompt">
        ❝ Sau khi đọc nội dung hôm nay, bạn rút ra điều gì cho bản thân? ❞
      </p>
      <textarea 
        className="reflection-textarea"
        value={reflection}
        onChange={handleChange}
        placeholder="Ghi lại suy nghĩ của bạn..."
        rows="6"
      />
      <div className="reflection-footer">
        {showSaved && (
          <small className="saved-indicator">✓ Đã lưu tự động</small>
        )}
        {reflection && !showSaved && (
          <small className="char-count">{reflection.length} ký tự</small>
        )}
      </div>
    </div>
  );
});

export default DailyReflection;
