import React, { useState } from 'react';

const Settings = () => {
    const [appName, setAppName] = useState('');

    const handleSaveSettings = async () => {
        // Call API to save settings
        await fetch('/api/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ appName }),
        });
        alert('Settings saved!');
    };

    return (
        <div>
            <h2>Settings</h2>
            <label>
                Application Name:
                <input
                    type="text"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                />
            </label>
            <button onClick={handleSaveSettings}>Save Settings</button>
        </div>
    );
};

export default Settings;