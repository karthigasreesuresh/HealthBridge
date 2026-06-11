const STORAGE_KEYS = {
  REQUESTS: 'healthbridge_patient_requests',
  VOLUNTEERS: 'healthbridge_volunteers',
  THEME: 'healthbridge_theme'
};

const SAMPLE_REQUESTS = [
  {
    id: 'req-1',
    fullName: 'Robert Miller',
    age: 72,
    phoneNumber: '+1 (555) 019-2834',
    email: 'robert.m@gmail.com',
    location: 'Northside Clinic District',
    supportType: 'Logistics & Transport',
    description: 'I need transport assistance to attend my chemotherapy sessions at the oncology center. I have sessions every Tuesday and Thursday morning, and I cannot drive myself due to fatigue.',
    createdAt: '2026-06-08T10:30:00.000Z',
    // Pre-calculated classifier values
    classification: {
      ageGroup: 'Senior/Geriatric (65+)',
      supportType: 'Logistics & Transport',
      priorityLevel: 'High',
      keyRequirement: 'Chemotherapy transport on Tuesdays/Thursdays',
      suggestedAction: 'Assign volunteer driver with CPR training; coordinate scheduling with Northside Oncology.'
    }
  },
  {
    id: 'req-2',
    fullName: 'Liam Chen',
    age: 8,
    phoneNumber: '+1 (555) 438-9901',
    email: 'yechen@yahoo.com',
    location: 'West End Suburbs',
    supportType: 'Medical Supplies',
    description: 'My son has severe asthma, and our home nebulizer machine has stopped working. We cannot afford a replacement this month and need an emergency nebulizer or assistance getting one.',
    createdAt: '2026-06-10T14:15:00.000Z',
    classification: {
      ageGroup: 'Pediatric (0-12)',
      supportType: 'Medical Supplies',
      priorityLevel: 'High',
      keyRequirement: 'Emergency home nebulizer machine',
      suggestedAction: 'Match with medical equipment donor immediately; dispatch temporary nebulizer from NGO inventory within 12 hours.'
    }
  },
  {
    id: 'req-3',
    fullName: 'Sophia Martinez',
    age: 28,
    phoneNumber: '+1 (555) 289-4456',
    email: 'sophia.m28@outlook.com',
    location: 'Downtown Metro Area',
    supportType: 'Psychological Support',
    description: 'I am looking for emotional counseling or support groups. I am recovering from a major surgery and experiencing severe postpartum and post-operative anxiety.',
    createdAt: '2026-06-11T08:00:00.000Z',
    classification: {
      ageGroup: 'Adult (18-64)',
      supportType: 'Psychological Support',
      priorityLevel: 'Medium',
      keyRequirement: 'Emotional counseling or postpartum anxiety support',
      suggestedAction: 'Connect with volunteer clinical psychologist for initial tele-consultation; provide links to recovery support groups.'
    }
  },
  {
    id: 'req-4',
    fullName: 'Marcus Thompson',
    age: 51,
    phoneNumber: '+1 (555) 902-1188',
    email: 'marcust@company.com',
    location: 'Southside Community',
    supportType: 'Financial Aid',
    description: 'I was recently laid off and can no longer afford the prescription insulin for my Type-2 diabetes. I have about a 4-day supply left and need emergency financial assistance or pharmacy vouchers.',
    createdAt: '2026-06-11T11:45:00.000Z',
    classification: {
      ageGroup: 'Adult (18-64)',
      supportType: 'Financial Aid',
      priorityLevel: 'High',
      keyRequirement: 'Diabetes insulin medication co-pay or vouchers',
      suggestedAction: 'Activate prescription co-pay fund; connect with local partner pharmacy to issue immediate insulin voucher.'
    }
  }
];

const SAMPLE_VOLUNTEERS = [
  {
    id: 'vol-1',
    name: 'Dr. Helen Vance',
    email: 'helen.vance.md@healthnet.org',
    phoneNumber: '+1 (555) 908-1212',
    city: 'Downtown Metro Area',
    skills: ['Medical Consultation', 'Patient Counseling'],
    availability: 'Weekends (Flexible)',
    reason: 'I want to offer my medical expertise to low-income families who cannot afford regular outpatient copays.',
    createdAt: '2026-06-01T09:00:00.000Z'
  },
  {
    id: 'vol-2',
    name: 'James O\'Connor',
    email: 'joconnor@drivecare.org',
    phoneNumber: '+1 (555) 443-8998',
    city: 'Northside Clinic District',
    skills: ['Patient Transport', 'First Aid'],
    availability: 'Tuesdays & Thursdays',
    reason: 'I am a retired firefighter with active CPR certification. I have a reliable SUV and want to help seniors get to their clinic appointments safely.',
    createdAt: '2026-06-05T15:30:00.000Z'
  },
  {
    id: 'vol-3',
    name: 'Emily Watson, RN',
    email: 'emily.nurse@gmail.com',
    phoneNumber: '+1 (555) 778-2234',
    city: 'West End Suburbs',
    skills: ['Nursing Care', 'Health Education'],
    availability: 'Weekday Evenings',
    reason: 'I am a registered nurse and believe in community healthcare. I want to assist with post-operative checkups and medication education.',
    createdAt: '2026-06-09T18:20:00.000Z'
  },
  {
    id: 'vol-4',
    name: 'Devin Larson',
    email: 'devin.l@techforgood.com',
    phoneNumber: '+1 (555) 345-0909',
    city: 'Downtown Metro Area',
    skills: ['Administrative Support', 'Translation Services'],
    availability: 'Saturdays',
    reason: 'I speak fluent Spanish and English and can assist with translation, form filling, and scheduling appointments.',
    createdAt: '2026-06-10T12:00:00.000Z'
  }
];

export const getStoredRequests = () => {
  const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(SAMPLE_REQUESTS));
    return SAMPLE_REQUESTS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Error parsing stored requests:', e);
    return SAMPLE_REQUESTS;
  }
};

export const saveStoredRequest = (request) => {
  const requests = getStoredRequests();
  const newRequest = {
    id: `req-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...request
  };
  const updated = [newRequest, ...requests];
  localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updated));
  return newRequest;
};

export const deleteStoredRequest = (id) => {
  const requests = getStoredRequests();
  const filtered = requests.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(filtered));
  return filtered;
};

export const getStoredVolunteers = () => {
  const data = localStorage.getItem(STORAGE_KEYS.VOLUNTEERS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(SAMPLE_VOLUNTEERS));
    return SAMPLE_VOLUNTEERS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Error parsing stored volunteers:', e);
    return SAMPLE_VOLUNTEERS;
  }
};

export const saveStoredVolunteer = (volunteer) => {
  const volunteers = getStoredVolunteers();
  const newVolunteer = {
    id: `vol-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...volunteer
  };
  const updated = [newVolunteer, ...volunteers];
  localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(updated));
  return newVolunteer;
};

export const deleteStoredVolunteer = (id) => {
  const volunteers = getStoredVolunteers();
  const filtered = volunteers.filter(v => v.id !== id);
  localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(filtered));
  return filtered;
};

export const getStoredTheme = () => {
  return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
};

export const saveStoredTheme = (theme) => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};
