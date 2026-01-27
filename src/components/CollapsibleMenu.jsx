import { useState, useCallback, useMemo } from 'react';
import { 
  IoBookSharp, 
  IoGameController, 
  IoInformationCircle, 
  IoClose, 
  IoSparkles, 
  IoMenu, 
  IoPersonSharp, 
  IoChevronDown, 
  IoChevronUp 
} from 'react-icons/io5';
import './CollapsibleMenu.css';

/**
 * Menu Configuration - Data-Driven Architecture
 * Type: 'view' | 'modal' | 'dropdown'
 * - view: Navigate to a view (handled by onViewChange)
 * - modal: Open a modal (handled by onOpenAbout)
 * - dropdown: Toggle dropdown (has children)
 */
const MENU_CONFIG = [
  {
    id: 'learning',
    type: 'view',
    icon: IoBookSharp,
    label: 'Học tập'
  },
  {
    id: 'game',
    type: 'view',
    icon: IoGameController,
    label: 'Trò chơi'
  },
  {
    id: 'tarot',
    type: 'view',
    icon: IoSparkles,
    label: 'Tarot'
  },
  {
    id: 'philosophers',
    type: 'dropdown',
    icon: IoPersonSharp,
    label: 'Các nhà triết gia',
    children: [
      { id: 'marx', label: 'C.Mác' },
      { id: 'engels', label: 'Ph.Ăng-ghen' },
      { id: 'lenin', label: 'V.I.Lênin' }
    ]
  },
  {
    id: 'about',
    type: 'modal',
    icon: IoInformationCircle,
    label: 'Giới thiệu'
  }
];

const CollapsibleMenu = ({ currentView, onViewChange, onOpenAbout }) => {
  // State Management
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  // Toggle menu visibility
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Generic dropdown toggle handler
  const toggleDropdown = useCallback((dropdownId) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdownId]: !prev[dropdownId]
    }));
  }, []);

  // Unified item click handler
  const handleItemClick = useCallback((item) => {
    switch (item.type) {
      case 'view':
        onViewChange(item.id);
        setIsOpen(false);
        break;
      
      case 'modal':
        onOpenAbout();
        setIsOpen(false);
        break;
      
      case 'dropdown':
        toggleDropdown(item.id);
        break;
      
      default:
        // Handle child items (they're always views)
        onViewChange(item.id);
        setIsOpen(false);
        break;
    }
  }, [onViewChange, onOpenAbout, toggleDropdown]);

  // Check if any child of a dropdown is active
  const isDropdownActive = useCallback((item) => {
    if (item.type !== 'dropdown' || !item.children) return false;
    return item.children.some(child => child.id === currentView);
  }, [currentView]);

  // Memoize menu items to prevent unnecessary re-renders
  const menuItemsConfig = useMemo(() => MENU_CONFIG, []);

  // Render a single menu item
  const renderMenuItem = useCallback((item) => {
    const Icon = item.icon;
    const isActive = currentView === item.id || isDropdownActive(item);
    const isDropdownOpen = openDropdowns[item.id];

    // Regular menu item
    if (item.type !== 'dropdown') {
      return (
        <button
          key={item.id}
          className={`menu-item ${isActive ? 'active' : ''}`}
          onClick={() => handleItemClick(item)}
          aria-label={item.label}
        >
          <Icon className="menu-item-icon" />
          <span className="menu-item-label">{item.label}</span>
        </button>
      );
    }

    // Dropdown menu item
    return (
      <div key={item.id} className="menu-dropdown">
        <button
          className={`menu-item dropdown-toggle ${isActive ? 'active' : ''}`}
          onClick={() => handleItemClick(item)}
          aria-expanded={isDropdownOpen}
          aria-label={`${item.label} menu`}
        >
          <Icon className="menu-item-icon" />
          <span className="menu-item-label">{item.label}</span>
          {isDropdownOpen ? (
            <IoChevronUp className="dropdown-icon" aria-hidden="true" />
          ) : (
            <IoChevronDown className="dropdown-icon" aria-hidden="true" />
          )}
        </button>
        
        <div 
          className={`dropdown-content ${isDropdownOpen ? 'open' : ''}`}
          role="menu"
        >
          {item.children.map((child) => (
            <button
              key={child.id}
              className={`dropdown-item ${currentView === child.id ? 'active' : ''}`}
              onClick={() => handleItemClick(child)}
              role="menuitem"
              aria-label={child.label}
            >
              <span className="dropdown-item-label">{child.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }, [currentView, openDropdowns, isDropdownActive, handleItemClick]);

  return (
    <>
      {/* Hamburger Toggle Button */}
      <button 
        className="menu-toggle-btn" 
        onClick={toggleMenu}
        aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <IoClose aria-hidden="true" /> : <IoMenu aria-hidden="true" />}
      </button>

      {/* Overlay - Click to close */}
      {isOpen && (
        <div 
          className="menu-overlay" 
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Menu */}
      <nav 
        className={`collapsible-menu ${isOpen ? 'open' : ''}`}
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="menu-header">
          <h2 className="menu-title">
            <IoSparkles className="menu-title-icon" aria-hidden="true" />
            Menu
          </h2>
        </div>

        {/* Navigation Items */}
        <div className="menu-nav" role="menubar">
          {menuItemsConfig.map(renderMenuItem)}
        </div>

        {/* Footer */}
        <div className="menu-footer">
          <p className="menu-footer-text">365 Ngày Marx-Lenin</p>
        </div>
      </nav>
    </>
  );
};

export default CollapsibleMenu;
