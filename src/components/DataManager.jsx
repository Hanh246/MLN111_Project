import { useState, memo } from 'react';
import { IoDownload, IoCloudUpload, IoDocument, IoTrash, IoCheckmarkCircle } from 'react-icons/io5';
import './DataManager.css';

const DataManager = memo(function DataManager() {
    const [message, setMessage] = useState(null);

    const showMessage = (text, type = 'success') => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), 3000);
    };

    // Export all data to JSON
    const exportToJSON = () => {
        try {
            const data = {
                favorites: JSON.parse(localStorage.getItem('favoriteQuotes') || '[]'),
                reflections: JSON.parse(localStorage.getItem('dailyReflections') || '{}'),
                quizResults: JSON.parse(localStorage.getItem('quizResults') || '{}'),
                exportedAt: new Date().toISOString()
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `mac-lenin-backup-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            URL.revokeObjectURL(url);

            showMessage('Đã xuất dữ liệu thành công!');
        } catch (error) {
            showMessage('Lỗi khi xuất dữ liệu!', 'error');
        }
    };

    // Export reflections to text file
    const exportReflectionsToText = () => {
        try {
            const reflections = JSON.parse(localStorage.getItem('dailyReflections') || '{}');
            
            if (Object.keys(reflections).length === 0) {
                showMessage('Chưa có suy ngẫm nào để xuất!', 'warning');
                return;
            }

            let content = '📚 SUY NGẪM HỌC TẬP - 365 NGÀY VỚI MÁC-LÊNIN\n';
            content += '='.repeat(50) + '\n\n';

            const sortedDates = Object.keys(reflections).sort();
            
            sortedDates.forEach(date => {
                if (reflections[date].trim()) {
                    content += `📅 ${date}\n`;
                    content += '-'.repeat(30) + '\n';
                    content += reflections[date] + '\n\n';
                }
            });

            content += '\n' + '='.repeat(50) + '\n';
            content += `Xuất lúc: ${new Date().toLocaleString('vi-VN')}\n`;

            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `suy-ngam-${new Date().toISOString().split('T')[0]}.txt`;
            link.click();
            URL.revokeObjectURL(url);

            showMessage('Đã xuất suy ngẫm thành công!');
        } catch (error) {
            showMessage('Lỗi khi xuất suy ngẫm!', 'error');
        }
    };

    // Import data from JSON
    const importFromJSON = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                // Validate data structure
                if (!data.favorites && !data.reflections && !data.quizResults) {
                    showMessage('File không hợp lệ!', 'error');
                    return;
                }

                // Merge with existing data
                if (data.favorites) {
                    const existing = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
                    const merged = [...existing];
                    data.favorites.forEach(fav => {
                        if (!merged.some(f => f.month === fav.month && f.day === fav.day)) {
                            merged.push(fav);
                        }
                    });
                    localStorage.setItem('favoriteQuotes', JSON.stringify(merged));
                }

                if (data.reflections) {
                    const existing = JSON.parse(localStorage.getItem('dailyReflections') || '{}');
                    const merged = { ...existing, ...data.reflections };
                    localStorage.setItem('dailyReflections', JSON.stringify(merged));
                }

                if (data.quizResults) {
                    const existing = JSON.parse(localStorage.getItem('quizResults') || '{}');
                    const merged = { ...existing, ...data.quizResults };
                    localStorage.setItem('quizResults', JSON.stringify(merged));
                }

                showMessage('Nhập dữ liệu thành công! Hãy refresh trang.');
            } catch (error) {
                showMessage('Lỗi khi đọc file!', 'error');
            }
        };
        reader.readAsText(file);
        
        // Reset input
        event.target.value = '';
    };

    // Clear all data
    const clearAllData = () => {
        if (window.confirm('Bạn có chắc muốn XÓA TẤT CẢ dữ liệu? Hành động này không thể hoàn tác!')) {
            localStorage.removeItem('favoriteQuotes');
            localStorage.removeItem('dailyReflections');
            localStorage.removeItem('quizResults');
            showMessage('Đã xóa tất cả dữ liệu!');
        }
    };

    // Get data stats
    const getStats = () => {
        const favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
        const reflections = JSON.parse(localStorage.getItem('dailyReflections') || '{}');
        const quizResults = JSON.parse(localStorage.getItem('quizResults') || '{}');

        return {
            favoriteCount: favorites.length,
            reflectionCount: Object.keys(reflections).filter(k => reflections[k].trim()).length,
            quizCount: Object.keys(quizResults).length
        };
    };

    const stats = getStats();

    return (
        <div className="data-manager">
            <h3 className="dm-title">
                <IoDocument className="section-icon" /> Quản Lý Dữ Liệu
            </h3>

            {/* Stats */}
            <div className="dm-stats">
                <div className="stat-item">
                    <span className="stat-number">{stats.favoriteCount}</span>
                    <span className="stat-label">Câu tâm đắc</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{stats.reflectionCount}</span>
                    <span className="stat-label">Suy ngẫm</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{stats.quizCount}</span>
                    <span className="stat-label">Quiz đã làm</span>
                </div>
            </div>

            {/* Actions */}
            <div className="dm-actions">
                <button className="dm-btn export-btn" onClick={exportToJSON}>
                    <IoDownload /> Xuất JSON
                </button>
                <button className="dm-btn export-btn" onClick={exportReflectionsToText}>
                    <IoDocument /> Xuất Suy Ngẫm
                </button>
                <label className="dm-btn import-btn">
                    <IoCloudUpload /> Nhập Dữ Liệu
                    <input 
                        type="file" 
                        accept=".json" 
                        onChange={importFromJSON} 
                        style={{ display: 'none' }} 
                    />
                </label>
                <button className="dm-btn delete-btn" onClick={clearAllData}>
                    <IoTrash /> Xóa Tất Cả
                </button>
            </div>

            {/* Message */}
            {message && (
                <div className={`dm-message ${message.type}`}>
                    <IoCheckmarkCircle /> {message.text}
                </div>
            )}
        </div>
    );
});

export default DataManager;
