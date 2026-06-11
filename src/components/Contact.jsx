import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message text is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">
            Have questions or want to partner with HealthBridge? Reach out directly and we will respond within 24 hours.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info Details Panel */}
          <div className="contact-info-panel">
            <h3>Get In Touch</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Feel free to call our support hotline, drop us an email, or visit our central offices for partnership discussions.
            </p>

            <div className="contact-card-list">
              <div className="contact-detail-item">
                <div className="contact-icon-box">
                  <Phone size={20} />
                </div>
                <div>
                  <h4>Phone Hotline</h4>
                  <p>+1 (800) 555-BRIDGE (274-3433)</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-box">
                  <Mail size={20} />
                </div>
                <div>
                  <h4>Support Email</h4>
                  <p>support@healthbridge-ngo.org</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-box">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4>Headquarters Office</h4>
                  <p>450 Healing Way, Suite 100, Metro City, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="card">
            <h3 style={{ marginBottom: 24 }}>Send Us A Message</h3>
            
            {success && (
              <div className="badge badge-success" style={{ display: 'block', padding: 12, borderRadius: 8, marginBottom: 20, textAlign: 'center', fontSize: '0.85rem' }}>
                Your message has been sent successfully! Our administrative team will reach out shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Full Name</label>
                <input
                  type="text"
                  id="contact-name"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <span className="form-error-msg">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input
                  type="email"
                  id="contact-email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="yourname@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <span className="form-error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  rows="4"
                  className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ resize: 'none' }}
                />
                {errors.message && <span className="form-error-msg">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
                Send Message <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
