import React from 'react';
import { Bot, User, MapPin, Tag, AlertTriangle, Lightbulb, CheckCircle, Printer } from 'lucide-react';

const RequestSummary = ({ patient, classification, onDone }) => {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return <span className="badge badge-danger" style={{ fontSize: '0.8rem', padding: '6px 12px' }}><AlertTriangle size={14} style={{ marginRight: 4 }} /> High Priority</span>;
      case 'Medium':
        return <span className="badge badge-warning" style={{ fontSize: '0.8rem', padding: '6px 12px' }}><AlertTriangle size={14} style={{ marginRight: 4 }} /> Medium Priority</span>;
      default:
        return <span className="badge badge-primary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>Low Priority</span>;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="success-card">
      <div className="success-icon-wrapper">
        <CheckCircle size={40} />
      </div>
      
      <h3>Request Submitted Successfully</h3>
      <p style={{ maxWidth: 500, margin: '0 auto 32px auto' }}>
        Thank you, {patient.fullName}. Your request has been securely recorded. Our AI-driven coordinator triage report is detailed below:
      </p>

      {/* AI Classifier Summary Card */}
      <div className="classifier-result-card animate-fade-in">
        <div className="classifier-header">
          <div className="classifier-title">
            <Bot size={20} />
            <span>Smart Intake Analysis</span>
            <span className="classifier-badge-bot">AI CLASSIFIER</span>
          </div>
          <div>
            {getPriorityBadge(classification.priorityLevel)}
          </div>
        </div>

        <div className="classifier-grid">
          <div className="classifier-field">
            <span className="classifier-field-label">Patient Demographics</span>
            <span className="classifier-field-value" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <User size={16} style={{ color: 'var(--primary)' }} />
              {patient.fullName} ({classification.ageGroup})
            </span>
          </div>

          <div className="classifier-field">
            <span className="classifier-field-label">Assigned Location</span>
            <span className="classifier-field-value" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={16} style={{ color: 'var(--primary)' }} />
              {patient.location}
            </span>
          </div>

          <div className="classifier-field">
            <span className="classifier-field-label">Classified Support Category</span>
            <span className="classifier-field-value" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Tag size={16} style={{ color: 'var(--primary)' }} />
              {classification.supportType}
            </span>
          </div>

          <div className="classifier-field">
            <span className="classifier-field-label">Extracted Key Requirement</span>
            <span className="classifier-field-value" style={{ fontStyle: 'italic', fontWeight: 500 }}>
              "{classification.keyRequirement}"
            </span>
          </div>
        </div>

        <div className="classifier-action-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '0.85rem', color: 'var(--secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Lightbulb size={16} />
            Suggested Coordinator Action
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
            {classification.suggestedAction}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        <button className="btn btn-outline" onClick={handlePrint} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          Print Summary <Printer size={16} />
        </button>
        <button className="btn btn-primary" onClick={onDone}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default RequestSummary;
