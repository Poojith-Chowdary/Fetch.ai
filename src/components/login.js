import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        setError('');

        // Validation
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }

        const user = JSON.parse(localStorage.getItem(username));
        if (user && user.password === password && user.role === role) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            setUser(user);
            if (user.role === 'admin') {
                navigate('/admin');
            } else if (user.role === 'procurement') {
                navigate('/procurement');
            }
        } else {
            setError('Invalid credentials or role');
        }
    };

    // Inline styles
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
            <h2 style={headingStyle}>Login</h2>
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
                <option value="admin">Admin</option>
                <option value="procurement">Procurement Manager</option>
            </select>
            <button
                onClick={handleLogin}
                style={buttonStyle}
            >
                Login
            </button>
        </div>
    );
};

export default Login;
