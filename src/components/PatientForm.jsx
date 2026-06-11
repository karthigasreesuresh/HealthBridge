import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { classifyRequest } from '../utils/classifier';
import { saveStoredRequest } from '../utils/storage';
import RequestSummary from './RequestSummary';

const PatientForm = ({ onAddRequest }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    phoneNumber: '',
    email: '',
    location: '',
    supportType: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classifiedData, setClassifiedData] = useState(null);
  const [submittedRequest, setSubmittedRequest] = useState(null);

  // Calculate Form Progress Fill
  useEffect(() => {
    const fields = ['fullName', 'age', 'phoneNumber', 'email', 'location', 'supportType', 'description'];
    const filledCount = fields.filter(field => {
      const val = formData[field];
      return typeof val === 'string' ? val.trim().length > 0 : !!val;
    }).length;
    setProgress(Math.round((filledCount / fields.length) * 100));
  }, [formData]);

  const validate = () => {
    const tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = 'Full Name is required';
    
    const ageNum = parseInt(formData.age, 10);
    if (!formData.age.trim()) {
      tempErrors.age = 'Age is required';
    } else if (isNaN(ageNum) || ageNum <= 0 || ageNum > 125) {
      tempErrors.age = 'Please enter a valid age';
    }
    
    if (!formData.phoneNumber.trim()) {
      tempErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(formData.phoneNumber.trim())) {
      tempErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.location.trim()) tempErrors.location = 'Location/Address is required';
    if (!formData.supportType) tempErrors.supportType = 'Please select a support category';
    
    if (!formData.description.trim()) {
      tempErrors.description = 'Please describe your requirement';
    } else if (formData.description.trim().length < 20) {
      tempErrors.description = 'Please describe your request in at least 20 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);

      // Simulate a brief AI analysis loading period
      setTimeout(() => {
        // Run AI classification
        const classification = classifyRequest(formData.age, formData.description, formData.supportType);
        
        // Save locally
        const savedReq = saveStoredRequest({
          ...formData,
          age: parseInt(formData.age, 10),
          classification
        });

        // Callback to parent to update live data list
        onAddRequest(savedReq);

        setSubmittedRequest(savedReq);
        setClassifiedData(classification);
        setIsSubmitting(false);
      }, 1800);
    }
  };

  const handleDone = () => {
    // Reset Form
    setFormData({
      fullName: '',
      age: '',
      phoneNumber: '',
      email: '',
      location: '',
      supportType: '',
      description: ''
    });
    setClassifiedData(null);
    setSubmittedRequest(null);
  };

  if (classifiedData && submittedRequest) {
    return (
      <div className="form-page-container animate-fade-in">
        <div className="form-card-container">
          <RequestSummary 
            patient={submittedRequest} 
            classification={classifiedData} 
            onDone={handleDone} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="form-page-container animate-fade-in">
      <div className="form-header">
        <h2>Request Care Support</h2>
        <p>Fill out the fields below. Our coordinate team and smart triage assistant will prioritize and match your case.</p>
      </div>

      <div className="form-card-container">
        {/* Progress Bar */}
        <div className="form-progress-bar" title={`Form ${progress}% complete`}>
          <div className="form-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        {isSubmitting ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }} className="animate-fade-in">
            <div className="chatbot-typing" style={{ justifyContent: 'center', marginBottom: 24 }}>
              <span style={{ width: 14, height: 14 }}></span>
              <span style={{ width: 14, height: 14, animationDelay: '0.2s' }}></span>
              <span style={{ width: 14, height: 14, animationDelay: '0.4s' }}></span>
            </div>
            <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--font-heading)' }}>
              <Sparkles size={20} className="text-secondary" style={{ animation: 'spin 2s linear infinite' }} />
              Smart Intake Assistant Triaging Request...
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 8 }}>
              Analyzing description keywords, evaluating priority indicators, and assigning support category suggestions.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="patient-name">Full Name</label>
                <input
                  type="text"
                  id="patient-name"
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  placeholder="Patient name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
                {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="patient-age">Age</label>
                <input
                  type="number"
                  id="patient-age"
                  className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                  placeholder="e.g. 45"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
                {errors.age && <span className="form-error-msg">{errors.age}</span>}
              </div>
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="patient-phone">Phone Number</label>
                <input
                  type="tel"
                  id="patient-phone"
                  className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                  placeholder="e.g. +1 (555) 019-2834"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
                {errors.phoneNumber && <span className="form-error-msg">{errors.phoneNumber}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="patient-email">Email Address</label>
                <input
                  type="email"
                  id="patient-email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="yourname@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <span className="form-error-msg">{errors.email}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="patient-loc">Location / Area</label>
              <input
                type="text"
                id="patient-loc"
                className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                placeholder="e.g. West End Suburbs, Metro City"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              {errors.location && <span className="form-error-msg">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="patient-support">Type of Support Required</label>
              <select
                id="patient-support"
                className={`form-control ${errors.supportType ? 'is-invalid' : ''}`}
                value={formData.supportType}
                onChange={(e) => setFormData({ ...formData, supportType: e.target.value })}
              >
                <option value="">-- Select Support Category --</option>
                <option value="Medical Supplies">Medical Supplies (Inhalers, diagnostics, nebulizers, etc.)</option>
                <option value="Logistics & Transport">Logistics & Transport (Chemotherapy, clinic appointments, etc.)</option>
                <option value="Psychological Support">Psychological Support (Counseling, therapy matches)</option>
                <option value="Financial Aid">Financial Aid (Prescription vouchers, copay assistance)</option>
                <option value="Food & Nutrition">Food & Nutrition (Dietary specific grocery packs)</option>
                <option value="Other">Other / General Assistance</option>
              </select>
              {errors.supportType && <span className="form-error-msg">{errors.supportType}</span>}
            </div>

            <div className="form-group">
              <div className="flex justify-between align-center">
                <label className="form-label" htmlFor="patient-desc">Describe your Requirement</label>
                <span style={{ fontSize: '0.75rem', color: formData.description.length >= 20 ? 'var(--success)' : 'var(--text-muted)' }}>
                  {formData.description.length} characters (Min 20)
                </span>
              </div>
              <textarea
                id="patient-desc"
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                placeholder="Describe your situation in detail. For example: 'I am an adult suffering from diabetes and I need insulin supplies, or transport support to oncology appointments next Tuesday...'"
                rows="5"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ resize: 'none' }}
              />
              {errors.description && <span className="form-error-msg">{errors.description}</span>}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 16 }}>
              Submit Request & Analyze
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PatientForm;
