import { useState } from 'react'
import LearningPage from './pages/LearningPage'
import Calendar from './components/Calendar'
import quotes from './data/quotes'
import { getThemeForMonth } from './data/monthlyThemes'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('learning'); // 'learning' or 'calendar'
  const [currentMonthTheme, setCurrentMonthTheme] = useState(
    getThemeForMonth(new Date().getMonth() + 1)
  );

  const handleMonthChange = (month) => {
    setCurrentMonthTheme(getThemeForMonth(month));
  };

  return (
    <>
      {/* View Switcher */}
      <div className="view-switcher">
        <button
          className={`view-btn ${currentView === 'learning' ? 'active' : ''}`}
          onClick={() => setCurrentView('learning')}
        >
          📚 Học tập
        </button>
        <button
          className={`view-btn ${currentView === 'calendar' ? 'active' : ''}`}
          onClick={() => setCurrentView('calendar')}
        >
          📅 Lịch
        </button>
      </div>

      {/* Conditional Rendering */}
      {currentView === 'learning' ? (
        <LearningPage />
      ) : (
        <div className="app">
          <div className="app-background"></div>
          <div className="app-content">
            <header className="app-header">
              <h1 className="app-title">Lịch Triết Học Mác-Lênin</h1>
              <p className="app-subtitle">365 Ngày với Tư Tưởng Cách Mạng</p>
            </header>

            <Calendar quotes={quotes} onMonthChange={handleMonthChange} />

            <footer className="app-footer">
              <p className="footer-theme">Chủ đề tháng: {currentMonthTheme}</p>
            </footer>
          </div>
        </div>
      )}
    </>
  )
}

export default App
