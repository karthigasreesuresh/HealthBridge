import React from 'react';
import { Truck, Stethoscope, HeartPulse, DollarSign, Apple, Bot } from 'lucide-react';

const Features = () => {
  const list = [
    {
      icon: <Stethoscope size={36} />,
      title: 'Medical Supplies matching',
      desc: 'Assisting low-income families and chronic care patients in sourcing diagnostics, nebulizers, inhalers, and mobility equipment.'
    },
    {
      icon: <Truck size={36} />,
      title: 'Logistics & Transport Help',
      desc: 'Connecting volunteer drivers with elderly, pediatric, or recovery patients who need safe transit to chemotherapy or clinics.'
    },
    {
      icon: <HeartPulse size={36} />,
      title: 'Psychological Support',
      desc: 'Routing anxious, postpartum, or post-operative patients to certified counselors offering voluntary counseling services.'
    },
    {
      icon: <DollarSign size={36} />,
      title: 'Prescription Financial Aid',
      desc: 'Managing prescription co-pay grants and partner pharmacy vouchers to resolve medication affordability barriers.'
    },
    {
      icon: <Apple size={36} />,
      title: 'Food & Nutrition Support',
      desc: 'Delivering diet-specific grocery bundles for diabetic, cardiovascular, or post-op recovery patients under strict nutrition rules.'
    },
    {
      icon: <Bot size={36} />,
      title: 'AI Triaging Assistant',
      desc: ' triage engine matching patient urgency, age details, and descriptions automatically for accelerated NGO dispatch.'
    }
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Our Dedicated Support Channels</h2>
          <p className="section-subtitle">
            We target key social determinants of health, mobilizing community resources to provide structured aid across five primary disciplines.
          </p>
        </div>

        <div className="grid grid-3">
          {list.map((item, idx) => (
            <div key={idx} className="card feature-card">
              <div className="feature-icon">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
