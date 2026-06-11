import React from 'react';
import { Heart } from 'lucide-react';

const Footer = ({ setCurrentTab }) => {
  const handleNav = (tabId) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo" onClick={() => handleNav('landing')}>
              <Heart size={24} fill="var(--primary)" />
              Health<span>Bridge</span>
            </div>
            <p className="footer-desc">
              Bridging community healthcare assistance gaps through software automation, qualified volunteer engagement, and rapid coordination.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a onClick={() => handleNav('landing')}>Home</a></li>
              <li><a onClick={() => handleNav('patient-form')}>Request Support</a></li>
              <li><a onClick={() => handleNav('volunteer-form')}>Become a Volunteer</a></li>
              <li><a onClick={() => handleNav('dashboard')}>Admin Panel</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a>Medical Equipment Sourcing</a></li>
              <li><a>Oncology Transit Planning</a></li>
              <li><a>Prescription Co-pay Grants</a></li>
              <li><a>Tele-counseling Circles</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a>Privacy Policy</a></li>
              <li><a>Terms of Service</a></li>
              <li><a>Hotline: +1 (800) 555-2743</a></li>
              <li><a>support@healthbridge.org</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} HealthBridge Alliance Inc. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            Made with <Heart size={14} fill="var(--secondary)" color="var(--secondary)" /> for Community Care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
