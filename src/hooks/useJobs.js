// src/hooks/useJobs.js
import { useState } from 'react';

const useJobs = () => {
  const [jobs, setJobs] = useState([]);

  const addJob = (job) => {
    setJobs([...jobs, { id: Date.now(), ...job }]);
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
