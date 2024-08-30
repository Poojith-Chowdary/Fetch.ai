import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './components/login';
import SignUp from './components/signup';
import AdminDashboard from './components/admindash';
import ProcurementManagerDashboard from './components/procdash';
import AgentDashboard from './components/agentdash';
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (loggedUser) {
            setUser(loggedUser);
        }
    }, []);

    return (
        <Router>
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Login setUser={setUser} />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/admin" element={user && user.role === 'admin' ? <AdminDashboard /> : <Login setUser={setUser} />} />
                    <Route path="/procurement" element={user && user.role === 'procurement' ? <ProcurementManagerDashboard /> : <Login setUser={setUser} />} />
                    <Route path="/agentdashboard" element={<AgentDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
