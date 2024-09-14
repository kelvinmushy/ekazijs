// src/components/JobList.js
import React from 'react';
import JobCard from './JobCard';

const JobList = () => (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 d-flex align-items-center mb-3 mt-4">
          <h2 className="m-0 mpt-20" style={{ fontSize: "30px" }}>
            Latest jobs
          </h2>
          <div className="d-flex ms-auto">
            <input type="hidden" name="action" value="search" />
            <button aria-label="All Jobs" className="btn btn-text border" type="submit">
              All jobs <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
  
        <JobCard
          imgSrc="https://ejobsitesoftware.com/jobboard_demo/image.php?image_name=logo/20240215081016Amazon-512.jpg&size=150"
          title="Surveyor"
          company="Surgesystems"
          location="8015 Hawthorne Ave. Mableton, GA 30126"
          date="Wed Dec 20, 2023"
          jobType="Contract"
          link="https://ejobsitesoftware.com/jobboard_demo/3735/Surveyor"
        />
        
        <JobCard
          imgSrc="https://ejobsitesoftware.com/jobboard_demo/image.php?image_name=logo/20240215081104logo3.png&size=150"
          title="Full Stack Developer"
          company="AYNSOFT"
          location="New Delhi"
          date="Tue Nov 28, 2023"
          jobType="Full-time"
          link="https://ejobsitesoftware.com/jobboard_demo/3727/Full-Stack-Developer"
        />
  
        <JobCard
          imgSrc="https://ejobsitesoftware.com/jobboard_demo/image.php?image_name=logo/20240830075831logo-w__1_.jpg&size=150"
          title="Senior Web Designer"
          company="Metagrowth Digital"
          location="Remote"
          date="Fri Aug 04, 2023"
          jobType="Full-time"
          link="https://ejobsitesoftware.com/jobboard_demo/1987/Senior-Web-Designer"
        />
  
        {/* Add more JobCard components as needed */}
        
      </div>
    </div>
  );
  

export default JobList;
