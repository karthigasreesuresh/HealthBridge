import React, { useState } from 'react';
import { Search, Trash2, Eye, Download, Info, Check, Filter, Calendar, MapPin, Tag, Brain, User, AlertTriangle, Lock, EyeOff, LogOut, KeyRound } from 'lucide-react';

const Dashboard = ({ requests, volunteers, onDeleteRequest, onDeleteVolunteer }) => {
  // Authorization States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tab & Detail States
  const [activeTab, setActiveTab] = useState('patients');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterSupport, setFilterSupport] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  const [selectedDetail, setSelectedDetail] = useState(null);

  // Default credentials for evaluation
  const ADMIN_CREDENTIALS = {
    email: 'admin@healthbridge.org',
    password: 'adminpassword'
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both your email and password.');
      return;
    }

    setIsLoggingIn(true);

    // Simulate authentication lag for realism
    setTimeout(() => {
      if (
        loginEmail.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
        loginPassword === ADMIN_CREDENTIALS.password
      ) {
        setIsAuthenticated(true);
        setLoginError('');
      } else {
        setLoginError('Invalid administrator credentials. Please try again.');
      }
      setIsLoggingIn(false);
    }, 1200);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginEmail('');
    setLoginPassword('');
    setSelectedDetail(null);
  };

  // Statistics
  const totalPatients = requests.length;
  const totalVolunteers = volunteers.length;
  const urgentCount = requests.filter(r => r.classification?.priorityLevel === 'High').length;

  // Filter Patients
  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          req.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority ? req.classification?.priorityLevel === filterPriority : true;
    const matchesSupport = filterSupport ? req.supportType === filterSupport : true;
    
    return matchesSearch && matchesPriority && matchesSupport;
  });

  // Filter Volunteers
  const filteredVolunteers = volunteers.filter(vol => {
    const matchesSearch = vol.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          vol.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = filterSkill ? vol.skills.includes(filterSkill) : true;
    
    return matchesSearch && matchesSkill;
  });

  const handleExportCSV = () => {
    const dataToExport = activeTab === 'patients' ? filteredRequests : filteredVolunteers;
    if (dataToExport.length === 0) return alert('No data to export!');
    
    const headers = activeTab === 'patients' 
      ? ['Name', 'Age', 'Phone', 'Email', 'Location', 'Support Type', 'Priority', 'Key Requirement']
      : ['Name', 'Email', 'Phone', 'City', 'Availability', 'Skills'];
      
    const rows = activeTab === 'patients'
      ? dataToExport.map(r => [r.fullName, r.age, r.phoneNumber, r.email, r.location, r.supportType, r.classification?.priorityLevel || 'N/A', r.classification?.keyRequirement || 'N/A'])
      : dataToExport.map(v => [v.name, v.email, v.phoneNumber, v.city, v.availability, v.skills.join('; ')]);
      
    let csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `healthbridge_${activeTab}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="form-page-container animate-fade-in" style={{ maxWidth: 450 }}>
        <div className="form-header">
          <div className="contact-icon-box" style={{ margin: '0 auto 16px auto', width: 60, height: 60, borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Lock size={28} />
          </div>
          <h2>Admin Access</h2>
          <p>Sign in to view the HealthBridge submissions database and triage dashboard.</p>
        </div>

        <div className="form-card-container">
          {loginError && (
            <div className="badge badge-danger" style={{ display: 'block', padding: 12, borderRadius: 8, marginBottom: 20, textAlign: 'left', fontSize: '0.85rem', lineHeight: 1.4 }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email Address</label>
              <input
                type="email"
                id="login-email"
                className="form-control"
                placeholder="admin@healthbridge.org"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                disabled={isLoggingIn}
              />
            </div>

            <div className="form-group" style={{ position: 'relative' }}>
              <label className="form-label" htmlFor="login-password">Password</label>
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  className="form-control"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  disabled={isLoggingIn}
                  style={{ width: '100%', paddingRight: '46px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 12 }} disabled={isLoggingIn}>
              {isLoggingIn ? 'Verifying Credentials...' : 'Sign In'}
            </button>
          </form>

          {/* Credentials helper card */}
          <div style={{ marginTop: 24, padding: 16, backgroundColor: 'var(--bg-accent)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
              <KeyRound size={14} className="text-secondary" />
              <span>Demo Administrator Account:</span>
            </div>
            <p style={{ margin: '2px 0', color: 'var(--text-secondary)' }}><strong>Email:</strong> admin@healthbridge.org</p>
            <p style={{ margin: '2px 0', color: 'var(--text-secondary)' }}><strong>Password:</strong> adminpassword</p>
          </div>
        </div>
      </div>
    );
  }

  // Render Dashboard console if authenticated
  return (
    <section className="container dashboard-wrapper animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h2 className="section-title" style={{ margin: 0 }}>NGO Administration Console</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Review patient care request lists, monitor priorities, and check volunteer details.</p>
        </div>
        
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn btn-outline" onClick={handleExportCSV} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Download size={16} /> Export CSV
          </button>
          <button className="btn btn-secondary" onClick={handleLogout} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats-grid">
        <div className="d-stat-card">
          <div className="d-stat-icon-wrapper d-stat-icon-1">
            <User size={24} />
          </div>
          <div className="d-stat-details">
            <h5>Total Care Requests</h5>
            <p>{totalPatients}</p>
          </div>
        </div>

        <div className="d-stat-card">
          <div className="d-stat-icon-wrapper d-stat-icon-2">
            <Check size={24} />
          </div>
          <div className="d-stat-details">
            <h5>Registered Volunteers</h5>
            <p>{totalVolunteers}</p>
          </div>
        </div>

        <div className="d-stat-card">
          <div className="d-stat-icon-wrapper d-stat-icon-3">
            <AlertTriangle size={24} />
          </div>
          <div className="d-stat-details">
            <h5>High Priority Urgent Cases</h5>
            <p>{urgentCount}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`dashboard-tab-btn ${activeTab === 'patients' ? 'active' : ''}`}
          onClick={() => { setActiveTab('patients'); setSearchQuery(''); }}
        >
          Patient Care Requests ({filteredRequests.length})
        </button>
        <button 
          className={`dashboard-tab-btn ${activeTab === 'volunteers' ? 'active' : ''}`}
          onClick={() => { setActiveTab('volunteers'); setSearchQuery(''); }}
        >
          Registered Volunteers ({filteredVolunteers.length})
        </button>
      </div>

      {/* Search and Filters */}
      <div className="dashboard-filter-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={activeTab === 'patients' ? 'Search by patient name or location...' : 'Search by volunteer name or city...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {activeTab === 'patients' ? (
          <>
            <select 
              className="filter-select" 
              value={filterPriority} 
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

            <select 
              className="filter-select" 
              value={filterSupport} 
              onChange={(e) => setFilterSupport(e.target.value)}
            >
              <option value="">All Support Types</option>
              <option value="Medical Supplies">Medical Supplies</option>
              <option value="Logistics & Transport">Logistics & Transport</option>
              <option value="Psychological Support">Psychological Support</option>
              <option value="Financial Aid">Financial Aid</option>
              <option value="Food & Nutrition">Food & Nutrition</option>
            </select>
          </>
        ) : (
          <select 
            className="filter-select" 
            value={filterSkill} 
            onChange={(e) => setFilterSkill(e.target.value)}
          >
            <option value="">All Skills</option>
            <option value="Medical Consultation">Medical Consultation</option>
            <option value="Nursing Care">Nursing Care</option>
            <option value="Patient Transport">Patient Transport</option>
            <option value="First Aid / CPR">First Aid / CPR</option>
            <option value="Translation Services">Translation Services</option>
            <option value="Administrative Support">Administrative Support</option>
            <option value="Food Supply Coordination">Food Supply Coordination</option>
          </select>
        )}
      </div>

      {/* Patients Data Table */}
      {activeTab === 'patients' && (
        <>
          <div className="table-container">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Patient Info</th>
                  <th>Location</th>
                  <th>Support Type</th>
                  <th>AI Triage Priority</th>
                  <th>Date Logged</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                      No support requests match your filtering parameters.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => (
                    <tr key={req.id}>
                      <td>
                        <div className="table-patient-name">
                          {req.fullName}
                          <span className="table-patient-sub">Age: {req.age} | {req.phoneNumber}</span>
                        </div>
                      </td>
                      <td>{req.location}</td>
                      <td>
                        <span className="badge badge-primary">{req.supportType}</span>
                      </td>
                      <td>
                        {req.classification?.priorityLevel === 'High' ? (
                          <span className="badge badge-danger">High</span>
                        ) : req.classification?.priorityLevel === 'Medium' ? (
                          <span className="badge badge-warning">Medium</span>
                        ) : (
                          <span className="badge badge-success" style={{ backgroundColor: 'var(--bg-accent)', color: 'var(--text-secondary)' }}>Low</span>
                        )}
                      </td>
                      <td>{formatDate(req.createdAt)}</td>
                      <td>
                        <div className="table-actions" style={{ justifyContent: 'center' }}>
                          <button className="action-icon-btn" onClick={() => setSelectedDetail({ type: 'patient', data: req })} title="View Details">
                            <Eye size={18} />
                          </button>
                          <button className="action-icon-btn" onClick={() => onDeleteRequest(req.id)} title="Delete Request">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View for Patients */}
          <div className="mobile-card-list">
            {filteredRequests.length === 0 ? (
              <div className="card text-center" style={{ padding: 32, color: 'var(--text-muted)' }}>
                No support requests matching parameters.
              </div>
            ) : (
              filteredRequests.map((req) => (
                <div key={req.id} className="m-dashboard-card animate-fade-in">
                  <div className="m-card-header">
                    <div className="m-card-title">
                      <h4>{req.fullName} (Age: {req.age})</h4>
                      <p>{formatDate(req.createdAt)}</p>
                    </div>
                    {req.classification?.priorityLevel === 'High' ? (
                      <span className="badge badge-danger">High</span>
                    ) : req.classification?.priorityLevel === 'Medium' ? (
                      <span className="badge badge-warning">Medium</span>
                    ) : (
                      <span className="badge badge-success">Low</span>
                    )}
                  </div>
                  <div className="m-card-body">
                    <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14} /> {req.location}</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Tag size={14} /> {req.supportType}</p>
                    <p style={{ fontStyle: 'italic', marginTop: 4 }}>"{req.classification?.keyRequirement}"</p>
                  </div>
                  <div className="m-card-footer">
                    <button className="btn btn-outline btn-sm" onClick={() => setSelectedDetail({ type: 'patient', data: req })}>
                      <Eye size={14} /> Detail
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => onDeleteRequest(req.id)} style={{ color: 'var(--danger)', borderColor: 'var(--danger-light)' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Volunteers Data Table */}
      {activeTab === 'volunteers' && (
        <>
          <div className="table-container">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Volunteer Info</th>
                  <th>Location</th>
                  <th>Skills / Capabilities</th>
                  <th>Availability</th>
                  <th>Date Registered</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVolunteers.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                      No volunteer accounts match your search query.
                    </td>
                  </tr>
                ) : (
                  filteredVolunteers.map((vol) => (
                    <tr key={vol.id}>
                      <td>
                        <div className="table-patient-name">
                          {vol.name}
                          <span className="table-patient-sub">{vol.email} | {vol.phoneNumber}</span>
                        </div>
                      </td>
                      <td>{vol.city}</td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {vol.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>{skill}</span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-success">{vol.availability}</span>
                      </td>
                      <td>{formatDate(vol.createdAt)}</td>
                      <td>
                        <div className="table-actions" style={{ justifyContent: 'center' }}>
                          <button className="action-icon-btn" onClick={() => setSelectedDetail({ type: 'volunteer', data: vol })} title="View Details">
                            <Eye size={18} />
                          </button>
                          <button className="action-icon-btn" onClick={() => onDeleteVolunteer(vol.id)} title="Delete Volunteer">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View for Volunteers */}
          <div className="mobile-card-list">
            {filteredVolunteers.length === 0 ? (
              <div className="card text-center" style={{ padding: 32, color: 'var(--text-muted)' }}>
                No volunteers matching parameters.
              </div>
            ) : (
              filteredVolunteers.map((vol) => (
                <div key={vol.id} className="m-dashboard-card animate-fade-in">
                  <div className="m-card-header">
                    <div className="m-card-title">
                      <h4>{vol.name}</h4>
                      <p>{formatDate(vol.createdAt)}</p>
                    </div>
                    <span className="badge badge-success">{vol.availability}</span>
                  </div>
                  <div className="m-card-body">
                    <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14} /> {vol.city}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                      {vol.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="m-card-footer">
                    <button className="btn btn-outline btn-sm" onClick={() => setSelectedDetail({ type: 'volunteer', data: vol })}>
                      <Eye size={14} /> Detail
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => onDeleteVolunteer(vol.id)} style={{ color: 'var(--danger)', borderColor: 'var(--danger-light)' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Row Detail Dialog Modal */}
      {selectedDetail && (
        <div className="detail-modal-overlay" onClick={() => setSelectedDetail(null)}>
          <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {selectedDetail.type === 'patient' ? <User size={22} className="text-primary" /> : <Check size={22} className="text-secondary" />}
                {selectedDetail.type === 'patient' ? 'Care Request Profile' : 'Volunteer Registration Profile'}
              </h3>
              <button 
                className="action-icon-btn" 
                onClick={() => setSelectedDetail(null)}
                style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              {selectedDetail.type === 'patient' ? (
                <>
                  <div className="modal-section" style={{ display: 'flex', gap: 24 }}>
                    <div>
                      <h4>Patient Name</h4>
                      <p style={{ fontWeight: 600 }}>{selectedDetail.data.fullName}</p>
                    </div>
                    <div>
                      <h4>Age Group</h4>
                      <p>{selectedDetail.data.age} ({selectedDetail.data.classification?.ageGroup || 'N/A'})</p>
                    </div>
                  </div>

                  <div className="modal-section">
                    <h4>Contact Details</h4>
                    <p>{selectedDetail.data.phoneNumber} | {selectedDetail.data.email}</p>
                  </div>

                  <div className="modal-section">
                    <h4>Assigned Area</h4>
                    <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14} /> {selectedDetail.data.location}</p>
                  </div>

                  <div className="modal-section">
                    <h4>Support Category</h4>
                    <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Tag size={14} /> {selectedDetail.data.supportType}</p>
                  </div>

                  <div className="modal-section">
                    <h4>Detailed Description & Narrative</h4>
                    <p style={{ whiteSpace: 'pre-wrap', padding: 12, backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                      {selectedDetail.data.description}
                    </p>
                  </div>

                  {/* Classification details */}
                  {selectedDetail.data.classification && (
                    <div className="classifier-result-card" style={{ margin: 0, borderStyle: 'solid' }}>
                      <div className="classifier-header" style={{ marginBottom: 12 }}>
                        <div className="classifier-title">
                          <Brain size={18} />
                          <span>Smart triaged profile</span>
                        </div>
                        <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>
                          {selectedDetail.data.classification.priorityLevel} Priority
                        </span>
                      </div>
                      
                      <div className="modal-section" style={{ marginBottom: 12 }}>
                        <h4 style={{ fontSize: '0.7rem' }}>Key Requirement Keyword extraction</h4>
                        <p style={{ fontWeight: 500 }}>"{selectedDetail.data.classification.keyRequirement}"</p>
                      </div>

                      <div className="classifier-action-box" style={{ padding: 12 }}>
                        <h4 style={{ fontSize: '0.7rem', color: 'var(--secondary)', marginBottom: 2 }}>NGO Care Recommendation</h4>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{selectedDetail.data.classification.suggestedAction}</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="modal-section">
                    <h4>Volunteer Name</h4>
                    <p style={{ fontWeight: 600 }}>{selectedDetail.data.name}</p>
                  </div>

                  <div className="modal-section">
                    <h4>Contact Details</h4>
                    <p>{selectedDetail.data.phoneNumber} | {selectedDetail.data.email}</p>
                  </div>

                  <div className="modal-section">
                    <h4>Assigned Operating City</h4>
                    <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14} /> {selectedDetail.data.city}</p>
                  </div>

                  <div className="modal-section">
                    <h4>General Availability</h4>
                    <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={14} /> {selectedDetail.data.availability}</p>
                  </div>

                  <div className="modal-section">
                    <h4>Registered Skill Badges</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                      {selectedDetail.data.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="badge badge-secondary">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="modal-section">
                    <h4>Reason & Motivation Statements</h4>
                    <p style={{ whiteSpace: 'pre-wrap', padding: 12, backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                      {selectedDetail.data.reason}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setSelectedDetail(null)}>
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
