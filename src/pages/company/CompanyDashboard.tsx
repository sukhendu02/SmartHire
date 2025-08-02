import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, Briefcase, TrendingUp, Eye, UserCheck, MessageSquare, Calendar } from 'lucide-react';

const CompanyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'candidates'>('jobs');

  const companyStats = {
    totalJobs: 8,
    activeJobs: 5,
    totalCandidates: 124,
    newApplications: 23
  };

  const jobPosts = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      applications: 45,
      posted: '2025-01-10',
      status: 'Active',
      views: 234
    },
    {
      id: '2',
      title: 'Backend Engineer',
      location: 'Remote',
      applications: 67,
      posted: '2025-01-08',
      status: 'Active',
      views: 189
    },
    {
      id: '3',
      title: 'Product Manager',
      location: 'New York, NY',
      applications: 32,
      posted: '2025-01-05',
      status: 'Closed',
      views: 156
    }
  ];

  const topCandidates = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Frontend Developer',
      score: 87,
      appliedFor: 'Senior Frontend Developer',
      status: 'Interview Scheduled'
    },
    {
      id: '2',
      name: 'Sarah Smith',
      role: 'Backend Engineer',
      score: 92,
      appliedFor: 'Backend Engineer',
      status: 'Under Review'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      role: 'Full Stack Developer',
      score: 78,
      appliedFor: 'Senior Frontend Developer',
      status: 'New Application'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-red-100 text-red-800';
      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'New Application':
        return 'bg-purple-100 text-purple-800';
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
        {/* Company Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TechCorp Inc.</h1>
              <p className="text-gray-600">Technology • San Francisco, CA</p>
              <p className="text-sm text-gray-500">Founded in 2015 • 500+ employees</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{companyStats.activeJobs}</p>
                <p className="text-gray-600">Active Jobs</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{companyStats.totalCandidates}</p>
                <p className="text-gray-600">Total Candidates</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{companyStats.newApplications}</p>
                <p className="text-gray-600">New Applications</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">579</p>
                <p className="text-gray-600">Job Views</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/company/post-job"
              className="flex items-center space-x-3 bg-blue-50 text-blue-700 p-4 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Briefcase className="w-5 h-5" />
              <span className="font-medium">Post New Job</span>
            </Link>
            <Link
              to="/company/manage-hr"
              className="flex items-center space-x-3 bg-green-50 text-green-700 p-4 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Manage HR Team</span>
            </Link>
            <Link
              to="/company/status-tracker"
              className="flex items-center space-x-3 bg-purple-50 text-purple-700 p-4 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Status Tracker</span>
            </Link>
            <button className="flex items-center space-x-3 bg-yellow-50 text-yellow-700 p-4 rounded-lg hover:bg-yellow-100 transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">View Messages</span>
            </button>
          </div>
        </div>

        {/* Tabbed Content */}
        <div className="bg-white rounded-lg shadow-md">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('jobs')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'jobs'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Job Posts ({jobPosts.length})
              </button>
              <button
                onClick={() => setActiveTab('candidates')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'candidates'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Top Candidates ({topCandidates.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'jobs' ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Your Job Posts</h3>
                  <Link
                    to="/company/post-job"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Post New Job
                  </Link>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Job Title</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Applications</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Views</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobPosts.map((job) => (
                        <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{job.title}</p>
                              <p className="text-sm text-gray-500">Posted {job.posted}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-600">{job.location}</td>
                          <td className="py-4 px-4">
                            <Link
                              to={`/company/candidates/${job.id}`}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              {job.applications} applications
                            </Link>
                          </td>
                          <td className="py-4 px-4 text-gray-600">{job.views}</td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                              <button className="text-red-600 hover:text-red-800 text-sm">Close</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Top Candidates</h3>
                  <Link
                    to="/company/status-tracker"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View All Candidates →
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {topCandidates.map((candidate) => (
                    <div key={candidate.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <UserCheck className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                            <p className="text-gray-600">{candidate.role}</p>
                            <p className="text-sm text-gray-500">Applied for: {candidate.appliedFor}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${getScoreColor(candidate.score)}`}>
                            {candidate.score}% Match
                          </div>
                          <div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                              {candidate.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex space-x-3">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                          View Resume
                        </button>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                          Contact
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
                          Schedule Interview
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;