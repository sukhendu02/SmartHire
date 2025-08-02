import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Mail, Shield, User, Trash2, Edit } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const ManageHR: React.FC = () => {
  const { showToast } = useToast();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('hr');

  const [hrTeam, setHrTeam] = useState([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@techcorp.com',
      role: 'Head HR',
      joinedDate: '2023-01-15',
      status: 'Active',
      permissions: ['View Candidates', 'Contact Candidates', 'Manage Jobs', 'Manage Team']
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob.smith@techcorp.com',
      role: 'HR Manager',
      joinedDate: '2023-06-20',
      status: 'Active',
      permissions: ['View Candidates', 'Contact Candidates', 'Manage Jobs']
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol.davis@techcorp.com',
      role: 'HR Coordinator',
      joinedDate: '2024-03-10',
      status: 'Active',
      permissions: ['View Candidates', 'Contact Candidates']
    },
    {
      id: '4',
      name: 'David Brown',
      email: 'david.brown@techcorp.com',
      role: 'HR Assistant',
      joinedDate: '2024-08-05',
      status: 'Pending',
      permissions: ['View Candidates']
    }
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) {
      showToast('Please enter an email address', 'error');
      return;
    }

    const newMember = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole === 'hr' ? 'HR Coordinator' : 'HR Manager',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      permissions: inviteRole === 'hr' 
        ? ['View Candidates', 'Contact Candidates']
        : ['View Candidates', 'Contact Candidates', 'Manage Jobs']
    };

    setHrTeam(prev => [...prev, newMember]);
    showToast(`Invitation sent to ${inviteEmail}`, 'success');
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const handleRemoveMember = (memberId: string, memberName: string) => {
    setHrTeam(prev => prev.filter(member => member.id !== memberId));
    showToast(`${memberName} removed from HR team`, 'success');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.includes('Head')) {
      return <Shield className="w-5 h-5 text-purple-600" />;
    }
    return <User className="w-5 h-5 text-blue-600" />;
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
              <h1 className="text-3xl font-bold text-gray-900">Manage HR Team</h1>
              <p className="text-gray-600 mt-2">
                Invite and manage your HR team members and their permissions
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => setShowInviteModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Invite HR Member</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{hrTeam.length}</p>
                <p className="text-gray-600">Total Members</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {hrTeam.filter(member => member.status === 'Active').length}
                </p>
                <p className="text-gray-600">Active Members</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {hrTeam.filter(member => member.status === 'Pending').length}
                </p>
                <p className="text-gray-600">Pending Invites</p>
              </div>
            </div>
          </div>
        </div>

        {/* HR Team List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">HR Team Members</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Member</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Role</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Joined</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Permissions</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hrTeam.map((member, index) => (
                  <tr key={member.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          {getRoleIcon(member.role)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-600">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-gray-900">{member.role}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {member.joinedDate}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {member.permissions.slice(0, 2).map((permission, permIndex) => (
                          <span key={permIndex} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            {permission}
                          </span>
                        ))}
                        {member.permissions.length > 2 && (
                          <span className="text-gray-500 text-xs">
                            +{member.permissions.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="bg-blue-100 text-blue-700 p-2 rounded hover:bg-blue-200 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        {member.role !== 'Head HR' && (
                          <button
                            onClick={() => handleRemoveMember(member.id, member.name)}
                            className="bg-red-100 text-red-700 p-2 rounded hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Invite HR Member</h3>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label htmlFor="inviteEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="inviteEmail"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="inviteRole" className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    id="inviteRole"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="hr">HR Coordinator</option>
                    <option value="manager">HR Manager</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Invite
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageHR;