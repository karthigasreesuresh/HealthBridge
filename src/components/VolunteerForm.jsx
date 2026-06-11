import React, { useState } from 'react';
import { CheckCircle2, Heart } from 'lucide-react';
import { saveStoredVolunteer } from '../utils/storage';

const VolunteerForm = ({ onAddVolunteer }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    city: '',
    skills: [],
    availability: '',
    reason: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const availableSkills = [
    'Medical Consultation',
    'Nursing Care',
    'Patient Transport',
    'First Aid / CPR',
    'Translation Services',
    'Administrative Support',
    'Food Supply Coordination'
  ];

  const handleSkillToggle = (skill) => {
    const activeSkills = [...formData.skills];
    if (activeSkills.includes(skill)) {
      setFormData({
        ...formData,
        skills: activeSkills.filter(s => s !== skill)
      });
    } else {
      setFormData({
        ...formData,
        skills: [...activeSkills, skill]
      });
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber.trim()) {
      tempErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(formData.phoneNumber.trim())) {
      tempErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.city.trim()) tempErrors.city = 'City/Location is required';
    if (formData.skills.length === 0) tempErrors.skills = 'Please select at least one skill';
    if (!formData.availability) tempErrors.availability = 'Please select your active availability';
    
    if (!formData.reason.trim()) {
      tempErrors.reason = 'Please share your reason for volunteering';
    } else if (formData.reason.trim().length < 15) {
      tempErrors.reason = 'Please explain in at least 15 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Save locally
      const savedVol = saveStoredVolunteer(formData);

      // Notify parent to append to live dashboard listing
      onAddVolunteer(savedVol);

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        city: '',
        skills: [],
        availability: '',
        reason: ''
      });
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="form-page-container animate-fade-in">
      <div className="form-header">
        <h2>Join as a Volunteer</h2>
        <p>Your skills can make a difference. Sign up to match with local patients needing transport, supplies, or assistance.</p>
      </div>

      <div className="form-card-container">
        {success ? (
          <div className="success-card">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={40} />
            </div>
            <h3>Registration Complete!</h3>
            <p style={{ maxWidth: 500, margin: '0 auto 24px auto' }}>
              Thank you for volunteering. Your profile has been saved. A coordinator will reach out to schedule an onboarding orientation soon.
            </p>
            <button className="btn btn-primary" onClick={() => setSuccess(false)}>
              Register Another Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="vol-name">Full Name</label>
              <input
                type="text"
                id="vol-name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <span className="form-error-msg">{errors.name}</span>}
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="vol-email">Email Address</label>
                <input
                  type="email"
                  id="vol-email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <span className="form-error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="vol-phone">Phone Number</label>
                <input
                  type="tel"
                  id="vol-phone"
                  className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                  placeholder="e.g. +1 (555) 778-2234"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
                {errors.phoneNumber && <span className="form-error-msg">{errors.phoneNumber}</span>}
              </div>
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="vol-city">City / Region</label>
                <input
                  type="text"
                  id="vol-city"
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                  placeholder="e.g. West End Suburbs"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                {errors.city && <span className="form-error-msg">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="vol-avail">Availability</label>
                <select
                  id="vol-avail"
                  className={`form-control ${errors.availability ? 'is-invalid' : ''}`}
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                >
                  <option value="">-- Select Availability --</option>
                  <option value="Weekdays (Flexible)">Weekdays (Flexible)</option>
                  <option value="Tuesdays & Thursdays">Tuesdays & Thursdays</option>
                  <option value="Weekday Evenings">Weekday Evenings</option>
                  <option value="Weekends (Flexible)">Weekends (Flexible)</option>
                  <option value="Saturdays">Saturdays</option>
                  <option value="Emergency On-Call">Emergency On-Call</option>
                </select>
                {errors.availability && <span className="form-error-msg">{errors.availability}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Select Your Skills (Select all that apply)</label>
              <div className="skills-selector-grid">
                {availableSkills.map((skill) => (
                  <div key={skill}>
                    <input
                      type="checkbox"
                      id={`skill-${skill}`}
                      className="skill-pill-checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                    />
                    <label htmlFor={`skill-${skill}`} className="skill-pill-label">
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
              {errors.skills && <span className="form-error-msg" style={{ display: 'block', marginTop: 8 }}>{errors.skills}</span>}
            </div>

            <div className="form-group" style={{ marginTop: 12 }}>
              <label className="form-label" htmlFor="vol-reason">Why do you want to volunteer with HealthBridge?</label>
              <textarea
                id="vol-reason"
                className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
                placeholder="Tell us about your background, interests, or clinical licensing information..."
                rows="4"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                style={{ resize: 'none' }}
              />
              {errors.reason && <span className="form-error-msg">{errors.reason}</span>}
            </div>

            <button type="submit" className="btn btn-secondary" style={{ width: '100%', marginTop: 16 }}>
              Register Profile <Heart size={16} fill="white" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VolunteerForm;
