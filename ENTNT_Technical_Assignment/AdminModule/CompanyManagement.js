import React, { useState, useEffect } from 'react';

const CompanyManagement = () => {
    const [companies, setCompanies] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        location: '',
        linkedIn: '',
        emails: '',
        phoneNumbers: '',
        comments: '',
        periodicity: '',
    });

    useEffect(() => {
        // Fetch companies from an API
        const fetchCompanies = async () => {
            const response = await fetch('/api/companies'); // Replace with your API endpoint
            const data = await response.json();
            setCompanies(data);
        };

        fetchCompanies();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.id) {
            // Update existing company
            await fetch(`/api/companies/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        } else {
            // Add new company
            await fetch('/api/companies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        }
        setFormData({
            id: null,
            name: '',
            location: '',
            linkedIn: '',
            emails: '',
            phoneNumbers: '',
            comments: '',
            periodicity: '',
        });
        fetchCompanies(); // Refresh the list
    };

    const handleEdit = (company) => {
        setFormData(company);
    };

    const handleDelete = async (id) => {
        await fetch(`/api/companies/${id}`, { method: 'DELETE' });
        fetchCompanies(); // Refresh the list
    };

    return (
        <div>
            <h2>Company Management</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Company Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <input
                    type="url"
                    name="linkedIn"
                    placeholder="LinkedIn Profile"
                    value={formData.linkedIn}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="emails"
                    placeholder="Emails (comma separated)"
                    value={formData.emails}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phoneNumbers"
                    placeholder="Phone Numbers (comma separated)"
                    value={formData.phoneNumbers}
                    onChange={handleChange}
                />
                <textarea
                    name="comments"
                    placeholder="Comments"
                    value={formData.comments}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="periodicity"
                    placeholder="Communication Periodicity"
                    value={formData.periodicity}
                    onChange={handleChange}
                />
                <button type="submit">{formData.id ? 'Update Company' : 'Add Company'}</button>
            </form>

            <ul>
                {companies.map(company => (
                    <li key={company.id}>
                        <strong>{company.name}</strong> - {company.location}
                        <button onClick={() => handleEdit(company)}>Edit</button>
                        <button onClick={() => handleDelete(company.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyManagement;