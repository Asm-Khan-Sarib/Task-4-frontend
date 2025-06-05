import React from 'react';
import UserTable from '../components/UserTable';
import PageWrapper from '../components/PageWrapper';

function AdminPanel() {

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };
  

  return (
    <PageWrapper>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>User Management</h2>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <UserTable />
      </div>
    </PageWrapper>
  );
}

export default AdminPanel;
