import React from 'react';

const Stats = () => {
  const stats = [
    { number: '12,450+', label: 'Patients Supported' },
    { number: '1,850+', label: 'Registered Volunteers' },
    { number: '14.2 Min', label: 'AI Triaging Speed' },
    { number: '100%', label: 'Free Services Always' }
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Our Community Impact</h2>
          <p className="section-subtitle">
            Measurable change powered by empathy, software Triaging, and community mobilization.
          </p>
        </div>

        <div className="stats-container">
          {stats.map((stat, idx) => (
            <div key={idx} className="card stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
