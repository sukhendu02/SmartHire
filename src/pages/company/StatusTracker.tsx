import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, ChevronRight, Filter, Search } from 'lucide-react';

const StatusTracker: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const jobs = [
    { id: '1', title: 'Senior Frontend Developer' },
    { id: '2', title: 'Backend Engineer' },
    { id: '3', title: 'Product Manager' }
  ];

  const statusFlow = [
    'Resume Submitted',
    'Contacted',
    'Interview Scheduled',
    'Interview Completed',
    'Hired'
  ];

  const candidates = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      jobId: '1',
      jobTitle: 'Senior Frontend Developer',
      currentStatus: 'Interview Completed',
      statusHistory: [
        { status: 'Resume Submitted', date: '2025-01-10', note: 'Application received' },
        { status: 'Contacted', date: '2025-01-12', note: 'Initial phone screening' },
        { status: 'Interview Scheduled', date: '2025-01-15', note: 'Technical interview scheduled' },
        { status: 'Interview Completed', date: '2025-01-18', note: 'Technical interview completed' }
      ],
      matchScore: 87
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah.smith@email.com',
      jobId: '2',
      jobTitle: 'Backend Engineer',
      currentStatus: 'Hired',
      statusHistory: [
        { status: 'Resume Submitted', date: '2025-01-08', note: 'Application received' },
        { status: 'Contacted', date: '2025-01-09', note: 'Phone screening passed' },
        { status: 'Interview Scheduled', date: '2025-01-11', note: 'On-site interview scheduled' },
        { status: 'Interview Completed', date: '2025-01-14', note: 'All interviews completed' },
        { status: 'Hired', date: '2025-01-16', note: 'Offer accepted' }
      ],
      matchScore: 92
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      jobId: '1',
      jobTitle: 'Senior Frontend Developer',
      currentStatus: 'Contacted',
      statusHistory: [
        { status: 'Resume Submitted', date: '2025-01-05', note: 'Application received' },
        { status: 'Contacted', date: '2025-01-07', note: 'Initial phone screening scheduled' }
      ],
      matchScore: 78
    }
  ];

  const filteredCandidates = candidates.filter(candidate => {
    const matchesJob = selectedJob === 'all' || candidate.jobId === selectedJob;
    const matchesStatus = selectedStatus === 'all' || candidate.currentStatus === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesJob && matchesStatus && matchesSearch;
  });

  const getStatusIndex = (status: string) => {
    return statusFlow.indexOf(status);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resume Submitted':
        return 'bg-blue-100 text-blue-800';
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'Interview Scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'Interview Completed':
        return 'bg-indigo-100 text-indigo-800';
      case 'Hired':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStatusTimeline = (candidate: any) => {
    const currentIndex = getStatusIndex(candidate.currentStatus);
    
    return (
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {statusFlow.map((status, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={status} className="flex items-center flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                isCompleted 
                  ? isCurrent 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {index + 1}
              </div>
              <div className="ml-2 text-xs text-gray-600 min-w-max">
                {status}
              </div>
              {index < statusFlow.length - 1 && (
                <ChevronRight className={`w-4 h-4 mx-2 ${
                  index < currentIndex ? 'text-green-600' : 'text-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    );
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
          <h1 className="text-3xl font-bold text-gray-900">Candidate Status Tracker</h1>
          <p className="text-gray-600 mt-2">
            Track candidate progress through your recruitment pipeline
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              <div>
                <label htmlFor="jobFilter" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Position
                </label>
                <select
                  id="jobFilter"
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Positions</option>
                  {jobs.map(job => (
                    <option key={job.id} value={job.id}>{job.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Status
                </label>
                <select
                  id="statusFilter"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  {statusFlow.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search Candidates
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search by name or email"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Flow Legend */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recruitment Pipeline</h2>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {statusFlow.map((status, index) => (
              <div key={status} className="flex items-center flex-shrink-0">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="ml-3 text-sm font-medium text-gray-900 min-w-max">
                  {status}
                </div>
                {index < statusFlow.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Candidates List */}
        <div className="space-y-6">
          {filteredCandidates.map(candidate => (
            <div key={candidate.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                    <p className="text-gray-600">{candidate.email}</p>
                    <p className="text-sm text-gray-500">{candidate.jobTitle}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(candidate.currentStatus)}`}>
                    {candidate.currentStatus}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Match Score: {candidate.matchScore}%</p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Progress Timeline</h4>
                {renderStatusTimeline(candidate)}
              </div>

              {/* Status History */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Status History</h4>
                <div className="space-y-3">
                  {candidate.statusHistory.map((history, index) => (
                    <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{history.status}</span>
                          <span className="text-sm text-gray-500">{history.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{history.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or search terms to find candidates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusTracker;