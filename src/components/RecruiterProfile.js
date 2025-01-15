import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAllEmployerJob } from "../api/api"; // Adjust the path if needed

const RecruiterProfile = () => {
  const { id } = useParams(); // Get recruiter ID from the route
  const [recruiterData, setRecruiterData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data by employer ID
        const allEmployers = await fetchAllEmployerJob(id);
         
       
        // Find recruiter data
        const recruiter = allEmployers.find((employer) => employer.employer_id === parseInt(id));

        if (recruiter) {
          setRecruiterData({
            name: recruiter.company_name,
            logo: recruiter.logo ? `http://localhost:4000${recruiter.logo}` : "https://via.placeholder.com/150",
            email: recruiter.emailAddress || "Not provided",
            location: recruiter.address || "Location not available",
          });

          // Map jobs if there are multiple
          setJobs(allEmployers.map((job) => ({
            id: job.id,
            title: job.title,
            description: job.summary || "No description provided",
            datePosted: job.posting_date ? job.posting_date.split("T")[0] : "Date not available",
          })));
        } else {
          console.warn("No recruiter data found for ID:", id);
        }
      } catch (error) {
        console.error("Error fetching recruiter data:", error);
      } finally {
        setLoading(false); // Stop loading after the fetch
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-center my-5">Loading recruiter profile...</div>;
  }

  if (!recruiterData) {
    return <div className="text-center my-5">Recruiter profile not found.</div>;
  }

  return (
    <div className="container my-5">
      {/* Recruiter's Profile Section */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <img
            src={recruiterData.logo}
            alt={recruiterData.name}
            className="rounded-circle"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h2 className="mt-3">{recruiterData.name}</h2>
          <p>
            <strong>Email:</strong> {recruiterData.email}
          </p>
          <p>
            <strong>Location:</strong> {recruiterData.location}
          </p>
        </div>
      </div>

      {/* List of Jobs Section */}
      <div className="row">
        <div className="col-12">
          <h3>Jobs Posted by {recruiterData.name}</h3>
          {jobs.length > 0 ? (
            <ul className="list-group">
              {jobs.map((job) => (
                <li key={job.id} className="list-group-item">
                  <Link to={`/job/${job.id}`}>
                    <h5>{job.title}</h5>
                  </Link>
                  <p dangerouslySetInnerHTML={{ __html: job.description }} />
                  <small>Posted on: {job.datePosted}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No jobs posted by this recruiter yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
