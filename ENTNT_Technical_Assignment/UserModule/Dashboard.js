import React, { useState, useEffect } from 'react';

import CompanyRow from './CompanyRow';
import CommunicationModal from './CommunicationModal';
import Notifications from './Notifications';
import CalendarView from './CalendarView';

const Dashboard = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Fetch companies from an API
        const fetchCompanies = async () => {
            const response = await fetch('/api/companies'); // Replace with your API endpoint
            const data = await response.json();
            setCompanies(data);
        };

        fetchCompanies();
    }, []);

    const handleSelectCompany = (companyId) => {
        setSelectedCompanies((prev) => {
            if (prev.includes(companyId)) {
                return prev.filter(id => id !== companyId);
            } else {
                return [...prev, companyId];
            }
        });
    };

    const handleCommunicationPerformed = () => {
        setShowModal(true);
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleCommunicationPerformed} disabled={selectedCompanies.length === 0}>
                Communication Performed
            </button>
            <Notifications companies={companies} />
            <div className="company-grid">
                {companies.map(company => (
                    <CompanyRow
                        key={company.id}
                        company={company}
                        onSelect={handleSelectCompany}
                        selected={selectedCompanies.includes(company.id)}
                    />
                ))}
            </div>
            {showModal && (
                <CommunicationModal
                    onClose={() => setShowModal(false)}
                    selectedCompanies={selectedCompanies}
                    onRefresh={() => setCompanies(companies)} // Refresh companies after communication
                />
            )}
            <CalendarView />
        </div>
    );
};

export default Dashboard;