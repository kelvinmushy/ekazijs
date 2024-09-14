// src/components/JobCard.js
import React from 'react';

const JobCard = ({ job }) => (
  <div className="job-card">
    <h2>{job.title}</h2>
    <p>{job.company}</p>
    <p>{job.location}</p>
    <p>{job.description}</p>
    <button>Apply</button>
  </div>
);

export default JobCard;
