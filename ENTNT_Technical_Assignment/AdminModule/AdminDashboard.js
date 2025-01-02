import React from 'react';
import UserManagement from './User Management';
import Settings from './Settings';
import CompanyManagement from './CompanyManagement'

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <User Management />
            <Settings />
        </div>
    );
};

export default AdminDashboard;