// src/components/JobList.js
import React from 'react';
import JobCard from './JobCard';

const JobList = ({ jobs }) => (
  <div className="job-list">
    {jobs.map((job) => (
      <JobCard key={job.id} job={job} />
    ))}
  </div>
);

export default JobList;
