import React from 'react';
import Header from '../components/Header';
import AdminDashboard from '../components/AdminDashboard';
import './AdminPage.css';

const AdminPage: React.FC = () => {
  return (
    <div className="admin-page">
      <Header />
      
      <main className="admin-content">
        <div className="container">
          <AdminDashboard />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;