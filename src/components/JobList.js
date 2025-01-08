// src/components/JobList.js
import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { fetchAllJobs } from '../api/api';

const JobList = () => {
  const [jobs, setJobs] = useState([]); // To store the fetched jobs
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state

  // Fetch jobs on component mount
  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetchAllJobs(); // Assuming fetchAllJobs fetches the data
        setJobs(response); // Store the fetched jobs in the state
      } catch (err) {
        setError('Failed to fetch jobs');
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    getJobs(); // Fetch the jobs
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while the jobs are being fetched
  }

  if (error) {
    return <div>{error}</div>; // Show an error message if fetching fails
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 d-flex align-items-center mb-3 mt-4">
          <h2 className="m-0 mpt-20" style={{ fontSize: '30px' }}>
            Latest Jobs
          </h2>
          <div className="d-flex ms-auto">
            <input type="hidden" name="action" value="search" />
            <button aria-label="All Jobs" className="btn btn-text border" type="submit">
              All jobs <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>

        {/* Map over the jobs array and display a JobCard for each */}
        {jobs.slice(0, 8).map((job) => (
          <JobCard
            key={job.id} // Use the job ID as the key for each card
            jobId={job.id}
            imgSrc={job.logo ? `http://localhost:4000${job.logo}` : 'https://via.placeholder.com/100'} // Replace with actual image URL logic if needed
            title={job.title}
            company={job.company_name ? `${job.company_name}` : 'No employer'}
            location={job.address || 'No location specified'}
            date={new Date(job.posting_date).toLocaleDateString()} // Format the posting date
            jobType="Full-time" // Modify as needed based on your data
            link={job.id || '#'} // Fallback link
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;
