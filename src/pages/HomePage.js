// src/pages/HomePage.js
import React, { useState } from 'react';
import JobSearch from '../components/JobSearch';
import JobList from '../components/JobList';
import FeaturedRecruiters from '../components/FeaturedRecruiters';
import JobCategoryList from '../components/JobCategoryList';
import Layout from '../components/Layout';

const dummyJobs = [
  { id: 1, title: 'Software Engineer', company: 'Tech Inc.', location: 'San Francisco', description: 'Develop awesome software.' },
  { id: 2, title: 'Product Manager', company: 'Business Corp.', location: 'New York', description: 'Manage products and projects.' }
  // Add more dummy jobs
];
const jobCategories = [
    [
      { name: 'Accounting/Finance/Banking', link: 'https://ejobsitesoftware.com/jobboard_demo/accounting-finance-banking-jobs/', count: 8 },
      { name: 'Administration/HR/Legal', link: 'https://ejobsitesoftware.com/jobboard_demo/administration-hr-legal-jobs/', count: 11 },
      { name: 'Advertising/Marketing/PR', link: 'https://ejobsitesoftware.com/jobboard_demo/advertising-marketing-pr-jobs/', count: 9 },
      { name: 'Arts & Design', link: 'https://ejobsitesoftware.com/jobboard_demo/arts-design-jobs/', count: 16 },
      { name: 'Automotive', link: 'https://ejobsitesoftware.com/jobboard_demo/automotive-jobs/', count: 3 },
    ],
    [
      { name: 'Aviation/Airlines', link: 'https://ejobsitesoftware.com/jobboard_demo/aviation-airlines-jobs/', count: 2 },
      { name: 'Call Centre/BPO', link: 'https://ejobsitesoftware.com/jobboard_demo/call-centre-bpo-jobs/', count: 2 },
      { name: 'Construction/Architecture', link: 'https://ejobsitesoftware.com/jobboard_demo/construction-architecture-jobs/', count: 1 },
      { name: 'Consulting Services', link: 'https://ejobsitesoftware.com/jobboard_demo/consulting-services-jobs/', count: 4 },
      { name: 'Courier/Distribution/Logistics', link: 'https://ejobsitesoftware.com/jobboard_demo/courier-distribution-logistics-jobs/', count: 1 },
    ],
    [
      { name: 'Customer Support/Telemarketing', link: 'https://ejobsitesoftware.com/jobboard_demo/customersupport-telemarketing-jobs/', count: 2 },
      { name: 'Education/Training', link: 'https://ejobsitesoftware.com/jobboard_demo/education-training-jobs/', count: 21 },
      { name: 'Engineering/Manufacturing', link: 'https://ejobsitesoftware.com/jobboard_demo/engineering-manufacturing-jobs/', count: 2 },
      { name: 'Entertainment/Media', link: 'https://ejobsitesoftware.com/jobboard_demo/entertainment-media-jobs/', count: 4 },
      { name: 'Environmental', link: 'https://ejobsitesoftware.com/jobboard_demo/environmental-jobs/', count: 1 },
    ]
  ];

const HomePage = () => {
  const [jobs, setJobs] = useState(dummyJobs);

  const handleSearch = (query) => {
    // Filter jobs based on the query (example logic)
    const filteredJobs = dummyJobs.filter(job => job.title.toLowerCase().includes(query.toLowerCase()));
    setJobs(filteredJobs);
  };

  return (
   
      <Layout>
      <h1>Find Your Dream Job</h1>
      <JobSearch onSearch={handleSearch} />
      <JobList jobs={jobs} />
      <JobCategoryList categories={jobCategories} />
      <FeaturedRecruiters/>
     
      </Layout>
    
  );
};

export default HomePage;
