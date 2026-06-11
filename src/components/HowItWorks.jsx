import React, { useState } from 'react';
import { FileText, Search, ClipboardCheck, Sparkles, CheckCircle2 } from 'lucide-react';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('patient');

  const patientSteps = [
    {
      num: '1',
      title: 'Submit Care Support Request',
      desc: 'Fill out our secure request form detailing your age, location, and specific care or supply requirements.'
    },
    {
      num: '2',
      title: 'Automated AI triaging',
      desc: 'Our Smart Assistant immediately structures your request, categorizes the support type, and estimates priority based on medical description triggers.'
    },
    {
      num: '3',
      title: 'Coordinator Intake Review',
      desc: 'An NGO case coordinator matches your triaged request with certified local volunteer assets and available supply inventory.'
    },
    {
      num: '4',
      title: 'Delivery & Ongoing Care',
      desc: 'A volunteer is dispatched to deliver supplies, provide transit, or offer counseling. We track progress on our community dashboard.'
    }
  ];

  const volunteerSteps = [
    {
      num: '1',
      title: 'Register Volunteer Profile',
      desc: 'Provide your city, skills (clinical/non-clinical), and time availability via our registration form.'
    },
    {
      num: '2',
      title: 'Verification & Credentialing',
      desc: 'For medical roles, our staff performs credential validation. For logistics, we complete brief safety checks.'
    },
    {
      num: '3',
      title: 'Match with Local Requests',
      desc: 'Receive alerts when local patient requests match your designated skillset and active schedule.'
    },
    {
      num: '4',
      title: 'Execute Care Dispatch',
      desc: 'Deliver care or supplies under secure coordination guidelines. Mark tasks complete in your dashboard.'
    }
  ];

  const activeSteps = activeTab === 'patient' ? patientSteps : volunteerSteps;

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            HealthBridge coordinates volunteer action and community medical aid through structured, digital workflows.
          </p>
        </div>

        {/* Toggle between Patient / Volunteer steps */}
        <div className="how-toggle-container">
          <button 
            className={`how-toggle-btn ${activeTab === 'patient' ? 'active' : ''}`}
            onClick={() => setActiveTab('patient')}
          >
            For Patients
          </button>
          <button 
            className={`how-toggle-btn ${activeTab === 'volunteer' ? 'active' : ''}`}
            onClick={() => setActiveTab('volunteer')}
          >
            For Volunteers
          </button>
        </div>

        {/* Timeline */}
        <div className="steps-timeline">
          {activeSteps.map((step) => (
            <div key={step.num} className="step-item animate-fade-in">
              <div className="step-number">{step.num}</div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
