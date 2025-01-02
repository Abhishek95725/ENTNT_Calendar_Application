import React from 'react';
import CommunicationReport from './CommunicationReport';
import CompanyReport from './CompanyReport';

const ReportingDashboard = () => {
    return (
        <div>
            <h1>Reporting and Analytics Dashboard</h1>
            <CommunicationReport />
            <CompanyReport />
        </div>
    );
};

export default ReportingDashboard;