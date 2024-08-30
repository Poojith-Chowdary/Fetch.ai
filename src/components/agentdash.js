import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AgentDashboard = () => {
    const location = useLocation();
    const { job } = location.state || {}; // Get job data from location state
    const [decisions, setDecisions] = useState([]);

    const triggerAgent = () => {
    const url = 'http://127.0.0.1:5000/trigger_supplier'; // Use the correct Flask route

    console.log('Triggering supplier agent with job:', job);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jobName: job.jobName,
            jobDescription: job.jobDescription, // Ensure this is a string that can be parsed
            startDate: job.startDate
        }),  // Send job details as the payload
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Supplier agent response:', data);
            toast.success('Supplier agent triggered successfully!');
            // Optionally, fetch decisions from the supplier after triggering
            //fetchDecisions();  
        })
        .catch((error) => {
            console.error('Error triggering supplier agent:', error);
            toast.error('Failed to trigger supplier agent.');
        });
};


    // Data structure for agents and their execution times
    const data = [
        { agent: 'Supplier', executionTime: 5 },
        { agent: 'Quality', executionTime: 7 },
        { agent: 'Transport', executionTime: 3 },
        { agent: 'Implementation', executionTime: 8 },
        { agent: 'Business', executionTime: 6 },
    ];

    return (
        <div>
            <h2>Agent Dashboard</h2>
            <p>Job Name: {job?.jobName}</p>
            <p>Job Description: {job?.jobDescription}</p>
            <p>Start Date: {job?.startDate}</p>
            <div>
                <button onClick={triggerAgent}>Trigger Supplier</button>
                <ToastContainer />
            </div>
            <div>
                <h3>Agent Decisions</h3>
                <ul>
                    {decisions.map((decision, index) => (
                        <li key={index}>{decision.from}: {decision.status}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Agent Execution Time</h3>
                <LineChart width={600} height={300} data={data}>
                    <Line type="monotone" dataKey="executionTime" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="agent" />
                    <YAxis label={{ value: 'Execution Time (minutes)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </div>
        </div>
    );
};

export default AgentDashboard;
