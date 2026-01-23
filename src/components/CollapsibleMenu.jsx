import { useState } from 'react';
import { IoBookSharp, IoGameController, IoInformationCircle, IoClose, IoSparkles, IoMenu } from 'react-icons/io5';
import './CollapsibleMenu.css';

const CollapsibleMenu = ({ currentView, onViewChange, onOpenAbout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (view) => {
    if (view === 'about') {
      onOpenAbout();
    } else {
      onViewChange(view);
    }
    setIsOpen(false); // Close menu after selection
  };

  const menuItems = [
    { id: 'learning', icon: IoBookSharp, label: 'Học tập' },
    { id: 'game', icon: IoGameController, label: 'Trò chơi' },
    { id: 'tarot', icon: IoSparkles, label: 'Tarot' },
    { id: 'about', icon: IoInformationCircle, label: 'Giới thiệu' }
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button 
        className="menu-toggle-btn" 
        onClick={toggleMenu}
        aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
      >
        {isOpen ? <IoClose /> : <IoMenu />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="menu-overlay" onClick={toggleMenu}></div>
      )}

      {/* Sidebar Menu */}
      <div className={`collapsible-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h2 className="menu-title">
            <IoSparkles className="menu-title-icon" />
            Menu
          </h2>
        </div>

        <nav className="menu-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                className={`menu-item ${isActive ? 'active' : ''}`}
                onClick={() => handleMenuItemClick(item.id)}
              >
                <Icon className="menu-item-icon" />
                <span className="menu-item-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="menu-footer">
          <p className="menu-footer-text">365 Ngày Marx-Lenin</p>
        </div>
      </div>
    </>
  );
};

export default CollapsibleMenu;
