import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import PatientForm from './components/PatientForm';
import VolunteerForm from './components/VolunteerForm';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import SmartAssistant from './components/SmartAssistant';
import { 
  getStoredRequests, 
  getStoredVolunteers, 
  getStoredTheme, 
  saveStoredTheme,
  deleteStoredRequest,
  deleteStoredVolunteer
} from './utils/storage';

function App() {
  const [currentTab, setCurrentTab] = useState('landing');
  const [theme, setTheme] = useState('light');
  const [requests, setRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  // Load Initial Settings & Store Lists
  useEffect(() => {
    // Theme setup
    const savedTheme = getStoredTheme();
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Seed/Load database
    setRequests(getStoredRequests());
    setVolunteers(getStoredVolunteers());
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    saveStoredTheme(nextTheme);
  };

  // Add Handlers
  const handleAddRequest = (newRequest) => {
    setRequests(prev => [newRequest, ...prev]);
  };

  const handleAddVolunteer = (newVol) => {
    setVolunteers(prev => [newVol, ...prev]);
  };

  // Delete Handlers
  const handleDeleteRequest = (id) => {
    if (confirm('Are you sure you want to delete this care support request?')) {
      const updated = deleteStoredRequest(id);
      setRequests(updated);
    }
  };

  const handleDeleteVolunteer = (id) => {
    if (confirm('Are you sure you want to delete this volunteer registration?')) {
      const updated = deleteStoredVolunteer(id);
      setVolunteers(updated);
    }
  };

  return (
    <>
      {/* Global Navigation */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      {/* Main Tab Views */}
      <main style={{ minHeight: 'calc(100vh - 280px)' }}>
        {currentTab === 'landing' && (
          <>
            <Hero setCurrentTab={setCurrentTab} />
            <Intro />
            <Features />
            <HowItWorks />
            <Stats />
            <FAQ />
            <Contact />
          </>
        )}

        {currentTab === 'patient-form' && (
          <PatientForm onAddRequest={handleAddRequest} />
        )}

        {currentTab === 'volunteer-form' && (
          <VolunteerForm onAddVolunteer={handleAddVolunteer} />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard 
            requests={requests} 
            volunteers={volunteers} 
            onDeleteRequest={handleDeleteRequest}
            onDeleteVolunteer={handleDeleteVolunteer}
          />
        )}
      </main>

      {/* Floating Smart Support Assistant Chatbot */}
      <SmartAssistant />

      {/* Global Footer */}
      <Footer setCurrentTab={setCurrentTab} />
    </>
  );
}

export default App;
