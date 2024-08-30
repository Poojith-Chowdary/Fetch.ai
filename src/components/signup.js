import React, { useState } from 'react';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('procurement');

    const handleSignUp = () => {
        const user = { username, password, role };
        localStorage.setItem(username, JSON.stringify(user));
        alert('Sign up successful');
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <select onChange={(e) => setRole(e.target.value)}>
                <option value="procurement">Procurement Manager</option>
                <option value="admin">Admin</option>
            </select>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default SignUp;
