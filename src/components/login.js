import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin'); // Default role set to 'admin'
    const navigate = useNavigate();

    const handleLogin = () => {
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
            alert('Invalid credentials or role');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="admin">Admin</option>
                <option value="procurement">Procurement Manager</option>
            </select>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
