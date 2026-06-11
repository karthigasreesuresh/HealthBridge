import React from 'react';
import { Heart, Activity, Globe } from 'lucide-react';

const Intro = () => {
  const values = [
    {
      icon: <Heart size={28} />,
      title: 'Empathetic Delivery',
      desc: 'We place patient dignity at the heart of our mission, ensuring every request is answered with sensitivity and care.'
    },
    {
      icon: <Activity size={28} />,
      title: 'Rapid Response Coordination',
      desc: 'Our platform matches urgent cases with nearby volunteers instantly to ensure care is dispatched when it matters.'
    },
    {
      icon: <Globe size={28} />,
      title: 'Accessible Community Care',
      desc: 'By building trust networks, we provide essential care completely free to families in marginalized and low-income areas.'
    }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container intro-container">
        <h2 className="section-title">Who We Are</h2>
        <p className="section-subtitle">
          HealthBridge is a non-profit digital ecosystem. We believe that healthcare is a fundamental right, and community mobilization is the fastest way to support those falling through the cracks of commercial medical networks.
        </p>

        <div className="grid grid-3 intro-grid">
          {values.map((val, idx) => (
            <div key={idx} className="card intro-card">
              <div className="intro-icon-wrapper">
                {val.icon}
              </div>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Intro;
