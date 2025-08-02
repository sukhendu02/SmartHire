import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, FileText, Star, User, CheckCircle, AlertCircle, Building, MapPin } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const ResumeUpload: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { showToast } = useToast();

  const mockJobMatches = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      matchScore: 87,
      salary: '$120K - $150K',
      requiredSkills: ['React', 'TypeScript', 'JavaScript', 'CSS'],
      matchingSkills: ['React', 'TypeScript', 'JavaScript'],
      missingSkills: ['CSS']
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      matchScore: 72,
      salary: '$90K - $110K',
      requiredSkills: ['React', 'Node.js', 'MongoDB', 'Express'],
      matchingSkills: ['React', 'Node.js'],
      missingSkills: ['MongoDB', 'Express']
    },
    {
      id: '3',
      title: 'React Developer',
      company: 'WebSolutions',
      location: 'New York, NY',
      matchScore: 45,
      salary: '$80K - $100K',
      requiredSkills: ['React', 'Redux', 'Jest', 'Webpack'],
      matchingSkills: ['React'],
      missingSkills: ['Redux', 'Jest', 'Webpack']
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        showToast('Please upload a PDF file', 'error');
        return;
      }
      
      setUploadedFile(file);
      setIsUploading(true);

      // Simulate file processing
      setTimeout(() => {
        setExtractedSkills(['React', 'TypeScript', 'JavaScript', 'Node.js', 'HTML', 'Git']);
        setShowResults(true);
        setIsUploading(false);
        showToast('Resume uploaded and processed successfully!', 'success');
      }, 2000);
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
                  className="flex items-center space-x-3 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg"
                >
                  <FileText className="w-5 h-5" />
                  <span>Resume Upload</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Resume</h1>
              
              {!uploadedFile ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Upload your resume to get matched with perfect jobs
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Drag and drop your PDF file here, or click to browse
                  </p>
                  <label className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                    Choose File
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{uploadedFile.name}</h3>
                      <p className="text-gray-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    {isUploading ? (
                      <div className="text-blue-600">Processing...</div>
                    ) : (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Extracted Skills */}
            {showResults && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Extracted Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {extractedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Job Matches */}
            {showResults && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Matches</h2>
                <div className="space-y-6">
                  {mockJobMatches.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                          <div className="flex items-center text-gray-600 space-x-4 mb-3">
                            <div className="flex items-center">
                              <Building className="w-4 h-4 mr-1" />
                              <span>{job.company}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{job.location}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 font-medium">{job.salary}</p>
                        </div>
                        
                        <div className="mt-4 lg:mt-0 lg:ml-6">
                          <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${getMatchScoreColor(job.matchScore)}`}>
                            <Star className="w-5 h-5 mr-2" />
                            {job.matchScore}% Match
                          </div>
                        </div>
                      </div>

                      {/* Skills Analysis */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Matching Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {job.matchingSkills.map((skill, index) => (
                              <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Missing Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {job.missingSkills.map((skill, index) => (
                              <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <Link
                          to={`/candidate/job/${job.id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                        <button
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            job.matchScore >= 50
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={job.matchScore < 50}
                        >
                          {job.matchScore >= 50 ? 'Apply Now' : 'Low Match - Cannot Apply'}
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

export default ResumeUpload;