import React from 'react';
import { ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import heroImage from '../assets/healthbridge_hero.png';

const Hero = ({ setCurrentTab }) => {
  return (
    <section className="hero-wrapper animate-fade-in">
      <div className="hero-bg-blur hero-blur-1"></div>
      <div className="hero-bg-blur hero-blur-2"></div>
      
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-tag">
            <span className="badge badge-primary">Empowering Care</span>
            Bridging Healthcare Gaps Together
          </div>
          
          <h1 className="hero-title">
            Direct Healthcare Support <span>When You Need It Most</span>
          </h1>
          
          <p className="hero-desc">
            HealthBridge connects patients in need of critical support, medical supplies, and transit assistance with certified volunteers and caring community members.
          </p>
          
          <div className="hero-actions">
            <button 
              className="btn btn-primary btn-lg" 
              onClick={() => setCurrentTab('patient-form')}
            >
              Request Support <ArrowRight size={18} />
            </button>
            <button 
              className="btn btn-outline btn-lg" 
              onClick={() => setCurrentTab('volunteer-form')}
            >
              Become a Volunteer
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-main-card">
            <img 
              src={heroImage} 
              alt="HealthBridge medical support vector graphic" 
              onError={(e) => {
                // Fallback image in case asset fails to load
                e.target.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600';
              }}
            />
          </div>
          
          {/* Decorative Float badges */}
          <div className="hero-badge-card hero-badge-1">
            <div className="contact-icon-box" style={{ width: 40, height: 40 }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.85rem' }}>100% Verified</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Licensed Doctors & Nurses</p>
            </div>
          </div>

          <div className="hero-badge-card hero-badge-2">
            <div className="contact-icon-box" style={{ width: 40, height: 40, backgroundColor: 'var(--secondary-light)', color: 'var(--secondary)' }}>
              <HeartHandshake size={20} />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.85rem' }}>Community Driven</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Over 10,000+ matches made</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
