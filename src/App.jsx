import { Suspense, lazy, useState, useEffect } from 'react'
import { IoBookSharp, IoGameController, IoInformationCircle, IoClose } from 'react-icons/io5'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'

// Lazy load pages for better performance
const LearningPage = lazy(() => import('./pages/LearningPage'));
const MillionaireGame = lazy(() => import('./pages/MillionaireGame'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

function App() {
  const [currentView, setCurrentView] = useState('learning'); // 'learning' or 'game'
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      offset: 0,
      delay: 0,
    });
  }, []);

  // Check if user has seen welcome modal before
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
    }
  }, []);

  const closeWelcomeModal = () => {
    setShowWelcomeModal(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const openAboutModal = () => {
    setShowWelcomeModal(true);
  };

  return (
    <>
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="modal-overlay" onClick={closeWelcomeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeWelcomeModal} aria-label="Đóng">
              <IoClose />
            </button>
            <Suspense fallback={
              <div className="loading-fallback">
                <div className="loading-spinner"></div>
                <p>Đang tải...</p>
              </div>
            }>
              <AboutPage />
            </Suspense>
          </div>
        </div>
      )}

      {/* View Switcher */}
      <div className="view-switcher">
        <button
          className={`view-btn ${currentView === 'learning' ? 'active' : ''}`}
          onClick={() => setCurrentView('learning')}
        >
          <IoBookSharp className="btn-icon" />
          Học tập
        </button>
        <button
          className={`view-btn ${currentView === 'game' ? 'active' : ''}`}
          onClick={() => setCurrentView('game')}
        >
          <IoGameController className="btn-icon" />
          Trò chơi
        </button>
        <button
          className="view-btn"
          onClick={openAboutModal}
        >
          <IoInformationCircle className="btn-icon" />
          Giới thiệu
        </button>
      </div>

      <Suspense fallback={
        <div className="loading-fallback">
          <div className="loading-spinner"></div>
          <p>Đang tải...</p>
        </div>
      }>
        {currentView === 'learning' && <LearningPage />}
        {currentView === 'game' && <MillionaireGame />}
      </Suspense>
    </>
  )
}

export default App
