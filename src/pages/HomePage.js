// src/pages/HomePage.js
import React, { useState } from 'react';
import JobSearch from '../components/JobSearch';
import JobList from '../components/JobList';

const dummyJobs = [
  { id: 1, title: 'Software Engineer', company: 'Tech Inc.', location: 'San Francisco', description: 'Develop awesome software.' },
  { id: 2, title: 'Product Manager', company: 'Business Corp.', location: 'New York', description: 'Manage products and projects.' }
  // Add more dummy jobs
];

const HomePage = () => {
  const [jobs, setJobs] = useState(dummyJobs);

  const handleSearch = (query) => {
    // Filter jobs based on the query (example logic)
    const filteredJobs = dummyJobs.filter(job => job.title.toLowerCase().includes(query.toLowerCase()));
    setJobs(filteredJobs);
  };

  return (
    <div>
      <h1>Find Your Dream Job</h1>
      <JobSearch onSearch={handleSearch} />
      <JobList jobs={jobs} />
    </div>
  );
};

export default HomePage;
