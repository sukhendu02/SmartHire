import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import ResumeUpload from './pages/candidate/ResumeUpload';
import JobDetail from './pages/candidate/JobDetail';
import CompanyDashboard from './pages/company/CompanyDashboard';
import JobPostForm from './pages/company/JobPostForm';
import CandidateList from './pages/company/CandidateList';
import ManageHR from './pages/company/ManageHR';
import StatusTracker from './pages/company/StatusTracker';
import Toast from './components/common/Toast';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
                <Route path="/candidate/resume-upload" element={<ResumeUpload />} />
                <Route path="/candidate/job/:id" element={<JobDetail />} />
                <Route path="/company/dashboard" element={<CompanyDashboard />} />
                <Route path="/company/post-job" element={<JobPostForm />} />
                <Route path="/company/candidates/:jobId" element={<CandidateList />} />
                <Route path="/company/manage-hr" element={<ManageHR />} />
                <Route path="/company/status-tracker" element={<StatusTracker />} />
              </Routes>
            </main>
            <Footer />
            <Toast />
          </div>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;