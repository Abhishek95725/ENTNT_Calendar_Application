import React, { useState, useEffect } from 'react';
import AnalyticsChart from './AnalyticsChart';

const CompanyReport = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            const response = await fetch('/api/companies'); // Replace with your API endpoint
            const data = await response.json();
            setCompanies(data);
        };

        fetchCompanies();
    }, []);

    const companyData = companies.map(company => ({
        name: company.name,
        communications: company.communications.length,
    }));

    return (
        <div>
            <h2>Company Report</h2>
            <AnalyticsChart data={companyData} />
            <ul>
                {companies.map(company => (
                    <li key={company.id}>
                        {company.name} - {company.communications.length} communications
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyReport;