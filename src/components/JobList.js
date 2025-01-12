import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { fetchAllJobs } from '../api/api';  // Assuming this function accepts categoryId as an argument
import { Link } from 'react-router-dom';

const JobList = () => {
  
  const [jobs, setJobs] = useState([]); // To store the fetched jobs
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state
  const [categoryId, setCategoryId] = useState(null); // State for categoryId

  // Fetch jobs when categoryId changes or on initial load
  useEffect(() => {
    const getJobs = async () => {
      setLoading(true);
      console.log('Fetching jobs for categoryId:', categoryId); // Debugging log

      try {
        // Fetch jobs from the API based on categoryId
        const response = await fetchAllJobs(categoryId); // If categoryId is null, fetchAllJobs will fetch all jobs
        setJobs(response); // Store the fetched jobs in the state

        // Cache jobs and update the timestamp
        const now = Date.now();
        localStorage.setItem('jobs', JSON.stringify(response));
        localStorage.setItem('jobs_last_updated', now.toString());
      } catch (err) {
        setError('Failed to fetch jobs');
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    // Only fetch if categoryId has changed or on first load
    getJobs();

  }, [categoryId]); // Re-run when categoryId changes

  // Function to handle category change (e.g., when a user selects a category)
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value ? parseInt(event.target.value) : null;
    console.log('Category selected:', selectedCategoryId); // Debugging log
    setCategoryId(selectedCategoryId); // Update categoryId state when category changes
  };

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
            <Link to="/all-jobs" className="btn btn-text border">All Jobs</Link>
          </div>
        </div>

        {/* Category Selection */}
        <div className="col-lg-12 mb-3">
          <select
            onChange={handleCategoryChange}
            value={categoryId || ''}  // Default value is empty string if no category is selected
            className="form-control"
          >
            <option value="">Select Category</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
            {/* Add more categories as needed */}
          </select>
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
