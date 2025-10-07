import React, { useState } from 'react';
import { Users, Shield } from 'lucide-react';
import './AdminDashboard.css';

interface UserStats {
  total_users: number;
  admin_count: number;
  user_count: number;
}

const AdminDashboard: React.FC = () => {
  const [userStats] = useState<UserStats>({
    total_users: 10,
    admin_count: 2,
    user_count: 8,
  });

  const mockUsers = [
    {
      id: '1',
      username: 'admin',
      full_name: 'Admin User',
      avatar_url: '/images/avatars/admin.jpg',
      is_admin: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      username: 'user1',
      full_name: 'Regular User',
      avatar_url: '/images/avatars/user.jpg',
      is_admin: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your blog platform and users</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-value">{userStats.total_users}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Shield size={24} />
          </div>
          <div className="stat-content">
            <h3>Admins</h3>
            <p className="stat-value">{userStats.admin_count}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>Regular Users</h3>
            <p className="stat-value">{userStats.user_count}</p>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h2>User Management</h2>
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.full_name}</td>
                  <td>{user.username}</td>
                  <td>{user.is_admin ? 'Admin' : 'User'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;