import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is HealthBridge?',
      a: 'HealthBridge is a non-profit community platform connecting patients in need of clinical/non-clinical healthcare support (such as medication access, transport to appointments, psychological counseling, or dietary support) with qualified local volunteers and community support systems.'
    },
    {
      q: 'Is this platform really free?',
      a: 'Yes, absolutely. Every service coordinated via HealthBridge is 100% free of charge for patients. We are funded entirely by philanthropic grants, individual donations, and sponsor programs. Volunteers donate their time and are never allowed to request fees.'
    },
    {
      q: 'How do I become a volunteer?',
      a: 'Click on "Volunteer Registration" in the navigation bar to sign up. You will fill out a short profile with your city, skills (clinical licenses, translation, driving, administration), and availability. Medical professionals will be asked to upload credential proof, and drivers will complete a standard background check.'
    },
    {
      q: 'Is my medical information kept confidential?',
      a: 'We take data protection very seriously. Your contact information is never sold or shared for commercial purposes. We only share details with the specific volunteer assigned to your care request after obtaining your consent. You can view our detailed Privacy Policy on our website.'
    },
    {
      q: 'What happens after I submit a patient request?',
      a: 'Once you click submit, our Smart Triaging Assistant immediately processes the description to suggest priority tags, age groups, and action steps. A regional coordinator reviews the structured case within 12-24 hours and matches it with a volunteer close to you, who will then coordinate delivery via phone or email.'
    }
  ];

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find quick answers to common questions about our triage flow, volunteering, and privacy.
          </p>
        </div>

        <div className="faq-wrapper">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`faq-item ${openIndex === idx ? 'open' : ''}`}
            >
              <button 
                className="faq-question-btn" 
                onClick={() => toggleAccordion(idx)}
                aria-expanded={openIndex === idx}
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} className="faq-icon-arrow" />
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Chatbot */}
        <div style={{ marginTop: 48, textAlign: 'center' }} className="animate-fade-in">
          <p style={{ color: 'var(--text-secondary)', marginBottom: 16, fontSize: '0.95rem', fontWeight: 500 }}>
            Can't find the answers you're looking for?
          </p>
          <button 
            className="btn btn-outline" 
            onClick={() => window.dispatchEvent(new CustomEvent('healthbridge-open-chat'))}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            Chat with Smart Assistant <MessageSquare size={16} className="text-secondary" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
