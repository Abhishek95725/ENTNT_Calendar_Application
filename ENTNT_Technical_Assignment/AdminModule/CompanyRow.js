import React from 'react';

const CompanyRow = ({ company, onSelect, selected }) => {
    const { name, communications, nextCommunication } = company;

    const getHighlightClass = () => {
        const today = new Date();
        const nextDate = new Date(nextCommunication.date);
        if (nextDate < today) return 'highlight-red'; // Overdue
        if (nextDate.toDateString() === today.toDateString()) return 'highlight-yellow'; // Due today
        return '';
    };

    return (
        <div className={`company-row ${getHighlightClass()}`} onClick={() => onSelect(company.id)}>
            <h3>{name}</h3>
            <div>
                <h4>Last Five Communications:</h4>
                <ul>
                    {communications.slice(-5).map((comm, index) => (
                        <li key={index} title={comm.notes}>
                            {comm.type} - {new Date(comm.date).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4>Next Scheduled Communication:</h4>
                <p>{nextCommunication.type} - {new Date(nextCommunication.date).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default CompanyRow;