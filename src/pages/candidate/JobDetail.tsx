import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building, MapPin, Clock, DollarSign, Star, CheckCircle, AlertCircle, User, FileText } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const JobDetail: React.FC = () => {
  const { id } = useParams();
  const { showToast } = useToast();

  // Mock job data - in real app, this would come from API
  const job = {
    id: id,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '$120K - $150K',
    matchScore: 87,
    posted: '3 days ago',
    jobType: 'Full-time',
    experience: '5+ years',
    description: `
      We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications and ensuring great user experience.
      
      In this role, you will work closely with our design and backend teams to implement responsive, accessible, and performant web applications using modern JavaScript frameworks.
    `,
    responsibilities: [
      'Develop new user-facing features using React.js',
      'Build reusable components and front-end libraries',
      'Translate designs and wireframes into high-quality code',
      'Optimize components for maximum performance across devices',
      'Collaborate with team members and stakeholders',
      'Participate in code reviews and maintain code quality'
    ],
    requirements: [
      '5+ years of experience in frontend development',
      'Strong proficiency in JavaScript, including DOM manipulation',
      'Thorough understanding of React.js and its core principles',
      'Experience with popular React.js workflows (Redux, Flux)',
      'Familiarity with RESTful APIs and modern authorization mechanisms',
      'Experience with code versioning tools such as Git'
    ],
    skillsRequired: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Git'],
    skillsMatching: ['React', 'TypeScript', 'JavaScript', 'Git'],
    skillsMissing: ['CSS', 'HTML'],
    benefits: [
      'Competitive salary and equity package',
      'Health, dental, and vision insurance',
      'Flexible work arrangements',
      'Professional development budget',
      '401(k) with company matching',
      'Unlimited PTO policy'
    ]
  };

  const handleApply = () => {
    if (job.matchScore >= 50) {
      showToast('Application submitted successfully!', 'success');
    } else {
      showToast('Your match score is too low to apply for this position', 'error');
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
                  className="flex items-center space-x-3 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
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
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Back Navigation */}
            <div className="mb-6">
              <Link
                to="/candidate/dashboard"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </div>

            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                    <div className="flex items-center">
                      <Building className="w-5 h-5 mr-2" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>{job.jobType} • {job.experience}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 lg:mt-0 lg:ml-6">
                  <div className={`inline-flex items-center px-6 py-3 rounded-full text-xl font-bold mb-4 ${getMatchScoreColor(job.matchScore)}`}>
                    <Star className="w-6 h-6 mr-2" />
                    Your Match Score: {job.matchScore}%
                  </div>
                  <button
                    onClick={handleApply}
                    className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
                      job.matchScore >= 50
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={job.matchScore < 50}
                  >
                    {job.matchScore >= 50 ? 'Apply for this Job' : 'Match Score Too Low'}
                  </button>
                </div>
              </div>

              {/* Skills Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-green-700 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Your Matching Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skillsMatching.map((skill, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-red-700 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Skills to Develop
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skillsMissing.map((skill, index) => (
                      <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line mb-6">{job.description}</p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h3>
                <ul className="space-y-2 mb-6">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                <ul className="space-y-2 mb-6">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Apply Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Ready to Apply?
                </h3>
                {job.matchScore >= 50 ? (
                  <div>
                    <p className="text-gray-600 mb-6">
                      Your skills are a great match for this position! We encourage you to apply.
                    </p>
                    <button
                      onClick={handleApply}
                      className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Submit Application
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-6">
                      Your current match score is below 50%. Consider developing the missing skills or look for positions that better match your profile.
                    </p>
                    <Link
                      to="/candidate/dashboard"
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                    >
                      Find Better Matches
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;