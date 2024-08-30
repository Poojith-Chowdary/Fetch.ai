import React, { useState } from 'react';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('procurement');
    const [error, setError] = useState('');

    const handleSignUp = () => {
        setError('');

        // Validation
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }

        // Check if the username already exists
        if (localStorage.getItem(username)) {
            setError('Username already exists');
            return;
        }

        const user = { username, password, role };
        localStorage.setItem(username, JSON.stringify(user));
        alert('Sign up successful');
    };

    // Inline styles
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 10px',
        margin: '9%',
        boxSizing: 'border-box',
    };

    const headingStyle = {
        marginBottom: '10px',
        marginTop: '0',
        fontSize: '24px',
    };

    const inputStyle = {
        width: '80%',
        maxWidth: '300px',
        margin: '5px 0',
        padding: '8px',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        width: '80%',
        maxWidth: '300px',
        margin: '5px 0',
        padding: '8px 16px',
        fontSize: '16px',
    };

    const errorStyle = {
        color: 'red',
        marginBottom: '10px',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Sign Up</h2>
            {error && <div style={errorStyle}>{error}</div>}
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={inputStyle}
            >
                <option value="procurement">Procurement Manager</option>
                <option value="admin">Admin</option>
            </select>
            <button
                onClick={handleSignUp}
                style={buttonStyle}
            >
                Sign Up
            </button>
        </div>
    );
};

export default SignUp;
