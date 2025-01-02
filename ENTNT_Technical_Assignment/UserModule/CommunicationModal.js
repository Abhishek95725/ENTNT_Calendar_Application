import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CommunicationModal = ({ onClose, onSubmit, selectedCompanies }) => {
    const [communicationType, setCommunicationType] = useState('');
    const [communicationDate, setCommunicationDate] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            companies: selectedCompanies,
            type: communicationType,
            date: communicationDate,
            notes: notes,
        };
        onSubmit(data);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Log Communication</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="communicationType">Type of Communication:</label>
                        <select
                            id="communicationType"
                            value={communicationType}
                            onChange={(e) => setCommunicationType(e.target.value)}
                            required
                        >
                            <option value="">Select...</option>
                            <option value="LinkedIn Post">LinkedIn Post</option>
                            <option value="Email">Email</option>
                            <option value="Phone Call">Phone Call</option>
                            <option value="Meeting">Meeting</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="communicationDate">Date of Communication:</label>
                        <input
                            type="date"
                            id="communicationDate"
                            value={communicationDate}
                            onChange={(e) => setCommunicationDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="notes">Notes:</label>
                        <textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add any additional comments here..."
                        />
                    </div>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

CommunicationModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    selectedCompanies: PropTypes.array.isRequired,
};

export default CommunicationModal;