import React, { useState, useEffect } from 'react';
import AnalyticsChart from './AnalyticsChart';

const CommunicationReport = () => {
    const [communications, setCommunications] = useState([]);

    useEffect(() => {
        const fetchCommunications = async () => {
            const response = await fetch('/api/communications'); // Replace with your API endpoint
            const data = await response.json();
            setCommunications(data);
        };

        fetchCommunications();
    }, []);

    const communicationTypes = communications.reduce((acc, comm) => {
        acc[comm.type] = (acc[comm.type] || 0) + 1;
        return acc;
    }, {});

    return (
        <div>
            <h2>Communication Report</h2>
            <AnalyticsChart data={communicationTypes} />
            <ul>
                {communications.map(comm => (
                    <li key={comm.id}>
                        {comm.type} on {new Date(comm.date).toLocaleDateString()} - {comm.notes}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommunicationReport;