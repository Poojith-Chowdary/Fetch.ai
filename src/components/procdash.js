import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProcurementManagerDashboard = () => {
    const [jobs, setJobs] = useState(JSON.parse(localStorage.getItem('jobs')) || []);
    const navigate = useNavigate();

    const proceedJob = (index) => {
        const selectedJob = jobs[index];
        console.log("Selected Job: ", selectedJob);  // Debugging: Check selected job
        navigate('/agentdashboard', { state: { job: selectedJob } }); // Pass job data via state
    };

    const declineJob = (index) => {
        const updatedJobs = jobs.filter((_, i) => i !== index);
        setJobs(updatedJobs);
        localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    };

    return (
        <div>
            <h2>Manager Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Job Name</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>Proceed</th>
                        <th>Decline</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job, index) => (
                        <tr key={index}>
                            <td>{job.jobName}</td>
                            <td>{job.jobDescription}</td>
                            <td>{job.startDate}</td>
                            <td><button onClick={() => proceedJob(index)}>Proceed</button></td>
                            <td><button onClick={() => declineJob(index)}>Decline</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProcurementManagerDashboard;
