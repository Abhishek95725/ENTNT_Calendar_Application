import React, { useState, useEffect } from 'react';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from an API
        const fetchUsers = async () => {
            const response = await fetch('/api/users'); // Replace with your API endpoint
            const data = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    const handleDeleteUser  = async (userId) => {
        // Call API to delete user
        await fetch(`/api/users/${userId}`, { method: 'DELETE' });
        setUsers(users.filter(user => user.id !== userId));
    };

    return (
        <div>
            <h2>User Management</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} <button onClick={() => handleDeleteUser (user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;