import React from 'react';
import { Link } from 'react-router-dom';
import { User, FileText, Briefcase, Star, Clock, MapPin, Building } from 'lucide-react';

const CandidateDashboard: React.FC = () => {
  const appliedJobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      matchScore: 87,
      status: 'Interview Scheduled',
      appliedDate: '2025-01-10',
      salary: '$120K - $150K'
    },
    {
      id: '2',
      title: 'React Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      matchScore: 72,
      status: 'Under Review',
      appliedDate: '2025-01-08',
      salary: '$90K - $110K'
    },
    {
      id: '3',
      title: 'Full Stack Engineer',
      company: 'InnovateLab',
      location: 'New York, NY',
      matchScore: 65,
      status: 'Applied',
      appliedDate: '2025-01-05',
      salary: '$100K - $130K'
    }
  ];

  const recommendedJobs = [
    {
      id: '4',
      title: 'Senior Software Engineer',
      company: 'MegaCorp',
      location: 'Seattle, WA',
      matchScore: 92,
      salary: '$140K - $170K',
      skills: ['React', 'TypeScript', 'AWS']
    },
    {
      id: '5',
      title: 'Frontend Architect',
      company: 'DesignTech',
      location: 'Austin, TX',
      matchScore: 84,
      salary: '$130K - $160K',
      skills: ['React', 'Vue.js', 'GraphQL']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interview Scheduled':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Applied':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
                <p className="text-gray-600">Frontend Developer</p>
              </div>
              
              <nav className="space-y-2">
                <Link
                  to="/candidate/dashboard"
                  className="flex items-center space-x-3 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg"
                >
                  <User className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/candidate/resume-upload"
                  className="flex items-center space-x-3 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  <span>Resume Upload</span>
                </Link>
              </nav>
            </div>

            {/* Profile Completion */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Profile Completion</h4>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Complete your profile to get better job matches!
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-gray-600">Applied Jobs</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">4</p>
                    <p className="text-gray-600">Interviews</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">25</p>
                    <p className="text-gray-600">Profile Views</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Jobs */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommended for You</h2>
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                        <div className="flex items-center text-gray-600 space-x-4">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-1" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right mt-2 sm:mt-0">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMatchScoreColor(job.matchScore)}`}>
                          <Star className="w-4 h-4 mr-1" />
                          {job.matchScore}% Match
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{job.salary}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-3">
                      <Link
                        to={`/candidate/job/${job.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        View Details
                      </Link>
                      <button
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          job.matchScore >= 50
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={job.matchScore < 50}
                      >
                        {job.matchScore >= 50 ? 'Apply Now' : 'Low Match'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Applied Jobs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Applications</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Job Title</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Company</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Match</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliedJobs.map((job) => (
                      <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <Link
                            to={`/candidate/job/${job.id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {job.title}
                          </Link>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{job.company}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(job.matchScore)}`}>
                            {job.matchScore}%
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm">{job.appliedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;