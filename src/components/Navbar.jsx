import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Heart } from 'lucide-react';

const Navbar = ({ currentTab, setCurrentTab, theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'patient-form', label: 'Request Support' },
    { id: 'volunteer-form', label: 'Volunteer' },
    { id: 'dashboard', label: 'Admin Dashboard' }
  ];

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    setIsOpen(false);
    
    // Smooth scroll to top when changing views
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar glass-nav">
      <div className="container nav-container">
        {/* Brand Logo */}
        <div className="nav-logo" onClick={() => handleNavClick('landing')}>
          <Heart size={28} fill="var(--primary)" />
          Health<span>Bridge</span>
        </div>

        {/* Links */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                className={`nav-link ${currentTab === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme and Menu Actions */}
        <div className="nav-actions">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button 
            className="menu-toggle" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
