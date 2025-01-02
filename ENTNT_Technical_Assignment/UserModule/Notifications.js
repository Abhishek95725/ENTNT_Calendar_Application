import React from 'react';
import PropTypes from 'prop-types';

const Notifications = ({ companies }) => {
    const today = new Date();
    const overdueCommunications = companies.filter(company => {
        const nextCommDate = new Date(company.nextCommunication.date);
        return nextCommDate < today;
    });

    const dueTodayCommunications = companies.filter(company => {
        const nextCommDate = new Date(company.nextCommunication.date);
        return nextCommDate.toDateString() === today.toDateString();
    });

    return (
        <div className="notifications">
            <h2>Notifications</h2>
            <div className="notification-icon">
                <span>🔔</span>
                <span className="badge">
                    {overdueCommunications.length + dueTodayCommunications.length}
                </span>
            </div>
            <div className="notification-grid">
                <h3>Overdue Communications</h3>
                <ul>
                    {overdueCommunications.map(company => (
                        <li key={company.id}>{company.name} - Overdue</li>
                    ))}
                </ul>
            </div>
            <div className="notification-grid">
                <h3>Today's Communications</h3>
                <ul>
                    {dueTodayCommunications.map(company => (
                        <li key={company.id}>{company.name} - Due Today</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

Notifications.propTypes = {
    companies: PropTypes.array.isRequired,
};

export default Notifications;