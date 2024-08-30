import React, { useState } from 'react';

const AdminDashboard = () => {
    const [jobs, setJobs] = useState(JSON.parse(localStorage.getItem('jobs')) || []);
    const [jobName, setJobName] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [startDate, setStartDate] = useState('');

    const addJob = () => {
        const newJob = { jobName, jobDescription, startDate, status: 'Available' };
        const updatedJobs = [...jobs, newJob];
        setJobs(updatedJobs);
        localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    };

    const removeJob = (index) => {
        const updatedJobs = jobs.filter((_, i) => i !== index);
        setJobs(updatedJobs);
        localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <input type="text" placeholder="Job Name" onChange={(e) => setJobName(e.target.value)} />
            <input type="text" placeholder="Job Description" onChange={(e) => setJobDescription(e.target.value)} />
            <input type="date" onChange={(e) => setStartDate(e.target.value)} />
            <button onClick={addJob}>Add Job</button>

            <table>
                <thead>
                    <tr>
                        <th>Job Name</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job, index) => (
                        <tr key={index}>
                            <td>{job.jobName}</td>
                            <td>{job.jobDescription}</td>
                            <td>{job.startDate}</td>
                            <td>{job.status}</td>
                            <td><button onClick={() => removeJob(index)}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
