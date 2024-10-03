// src/hooks/useJobs.js
import { useState } from 'react';

const useJobs = () => {
  const [jobs, setJobs] = useState([]);

  const addJob = async (job) => {
    try {
      // Make the POST request to save the job data to the API
      const response = await fetch('http://localhost:4000/api/admin/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job), // Send the job data to the backend
      });

      if (!response.ok) {
        throw new Error('Failed to save the job');
      }

      const savedJob = await response.json(); // Get the saved job with its server-generated ID

      // Update the local state with the new job from the API response
      setJobs((prevJobs) => [...prevJobs, savedJob]); 

    } catch (error) {
      console.error('Error adding job:', error.message);
      // Handle the error appropriately (e.g., show an error message)
    }
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const editJob = (id, updatedJob) => {
    setJobs(jobs.map(job => (job.id === id ? { ...job, ...updatedJob } : job)));
  };

  return { jobs, addJob, deleteJob, editJob };
};

export default useJobs;
