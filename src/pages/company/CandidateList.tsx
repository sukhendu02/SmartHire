import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Mail, Calendar, User, Star, ChevronDown } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const CandidateList: React.FC = () => {
  const { jobId } = useParams();
  const { showToast } = useToast();
  
  const [candidates, setCandidates] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      matchScore: 87,
      status: 'New Application',
      appliedDate: '2025-01-10',
      experience: '5 years',
      location: 'San Francisco, CA',
      skills: ['React', 'TypeScript', 'JavaScript', 'Git'],
      resumeUrl: '#'
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah.smith@email.com',
      phone: '+1 (555) 234-5678',
      matchScore: 92,
      status: 'Contacted',
      appliedDate: '2025-01-08',
      experience: '7 years',
      location: 'New York, NY',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      resumeUrl: '#'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1 (555) 345-6789',
      matchScore: 78,
      status: 'Interview Scheduled',
      appliedDate: '2025-01-05',
      experience: '4 years',
      location: 'Austin, TX',
      skills: ['React', 'Vue.js', 'Python', 'Docker'],
      resumeUrl: '#'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 456-7890',
      matchScore: 65,
      status: 'Rejected',
      appliedDate: '2025-01-03',
      experience: '3 years',
      location: 'Seattle, WA',
      skills: ['JavaScript', 'HTML', 'CSS'],
      resumeUrl: '#'
    }
  ]);

  const jobTitle = 'Senior Frontend Developer'; // In real app, fetch from API

  const statusOptions = [
    'New Application',
    'Contacted',
    'Interview Scheduled',
    'Interview Completed',
    'Hired',
    'Rejected'
  ];

  const handleStatusChange = (candidateId: string, newStatus: string) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, status: newStatus }
          : candidate
      )
    );
    showToast(`Candidate status updated to ${newStatus}`, 'success');
  };

  const handleContact = (candidate: any) => {
    showToast(`Contacting ${candidate.name} at ${candidate.email}`, 'info');
  };

  const handleScheduleInterview = (candidate: any) => {
    showToast(`Interview scheduled with ${candidate.name}`, 'success');
    handleStatusChange(candidate.id, 'Interview Scheduled');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New Application':
        return 'bg-blue-100 text-blue-800';
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'Interview Scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'Interview Completed':
        return 'bg-indigo-100 text-indigo-800';
      case 'Hired':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/company/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
              <p className="text-gray-600 mt-2">
                {candidates.length} candidates applied for <span className="font-semibold">{jobTitle}</span>
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-blue-600">
              {candidates.length}
            </div>
            <div className="text-gray-600">Total Applications</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {candidates.filter(c => c.status === 'New Application').length}
            </div>
            <div className="text-gray-600">New Applications</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-purple-600">
              {candidates.filter(c => c.status === 'Interview Scheduled').length}
            </div>
            <div className="text-gray-600">Interviews Scheduled</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-green-600">
              {candidates.filter(c => c.status === 'Hired').length}
            </div>
            <div className="text-gray-600">Hired</div>
          </div>
        </div>

        {/* Candidates List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Candidate Applications</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Candidate</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Match Score</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Applied Date</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => (
                  <tr key={candidate.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{candidate.name}</div>
                          <div className="text-sm text-gray-600">{candidate.email}</div>
                          <div className="text-sm text-gray-500">{candidate.experience} experience • {candidate.location}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {candidate.skills.slice(0, 3).map((skill, skillIndex) => (
                              <span key={skillIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                            {candidate.skills.length > 3 && (
                              <span className="text-gray-500 text-xs">+{candidate.skills.length - 3} more</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(candidate.matchScore)}`}>
                        <Star className="w-4 h-4 mr-1" />
                        {candidate.matchScore}%
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="relative">
                        <select
                          value={candidate.status}
                          onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                          className={`appearance-none pr-8 pl-3 py-1 rounded-full text-sm font-medium border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(candidate.status)}`}
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {candidate.appliedDate}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(candidate.resumeUrl, '_blank')}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors flex items-center space-x-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>Resume</span>
                        </button>
                        <button
                          onClick={() => handleContact(candidate)}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200 transition-colors flex items-center space-x-1"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Contact</span>
                        </button>
                        <button
                          onClick={() => handleScheduleInterview(candidate)}
                          className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm hover:bg-purple-200 transition-colors flex items-center space-x-1"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>Interview</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateList;