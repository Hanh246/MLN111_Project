import { Suspense, lazy, useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import CollapsibleMenu from "./components/CollapsibleMenu";

// Lazy load pages for better performance
const LearningPage = lazy(() => import("./pages/LearningPage"));
const MillionaireGame = lazy(() => import("./pages/MillionaireGame"));
const TarotPage = lazy(() => import("./pages/TarotPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const KarlMarxPage = lazy(() => import("./pages/KarlMarxPage"));
const EngelsPage = lazy(() => import("./pages/EngelsPage"));
const LeninPage = lazy(() => import("./pages/LeninPage"));

function App() {
  const [currentView, setCurrentView] = useState("learning"); // 'learning' or 'game'
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      offset: 0,
      delay: 0,
    });
  }, []);

  // Check if user has seen welcome modal before
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
    }
  }, []);

  const closeWelcomeModal = () => {
    setShowWelcomeModal(false);
    localStorage.setItem("hasSeenWelcome", "true");
  };

  const openAboutModal = () => {
    setShowWelcomeModal(true);
  };

  return (
    <>
      {/* Collapsible Menu */}
      <CollapsibleMenu
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenAbout={openAboutModal}
      />

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="modal-overlay" onClick={closeWelcomeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeWelcomeModal}
              aria-label="Đóng"
            >
              <IoClose />
            </button>
            <Suspense
              fallback={
                <div className="loading-fallback">
                  <div className="loading-spinner"></div>
                  <p>Đang tải...</p>
                </div>
              }
            >
              <AboutPage />
            </Suspense>
          </div>
        </div>
      )}
      <Suspense
        fallback={
          <div className="loading-fallback">
            <div className="loading-spinner"></div>
            <p>Đang tải...</p>
          </div>
        }
      >
        {currentView === "learning" && <LearningPage />}
        {currentView === "game" && <MillionaireGame />}
        {currentView === "tarot" && <TarotPage />}
        {currentView === "marx" && <KarlMarxPage />}
        {currentView === "engels" && <EngelsPage />}
        {currentView === "lenin" && <LeninPage />}
      </Suspense>
    </>
  );
}

export default App;
