import { Suspense, lazy, useState } from 'react'
import './App.css'

// Lazy load LearningPage for better performance
const LearningPage = lazy(() => import('./pages/LearningPage'));
const MillionaireGame = lazy(() => import('./pages/MillionaireGame'));

function App() {
  const [currentView, setCurrentView] = useState('learning'); // 'learning' or 'game'

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
          className={`view-btn ${currentView === 'game' ? 'active' : ''}`}
          onClick={() => setCurrentView('game')}
        >
          🎮 Trò chơi
        </button>
      </div>

      <Suspense fallback={
        <div className="loading-fallback">
          <div className="loading-spinner"></div>
          <p>Đang tải...</p>
        </div>
      }>
        {currentView === 'learning' ? <LearningPage /> : <MillionaireGame />}
      </Suspense>
    </>
  )
}

export default App
