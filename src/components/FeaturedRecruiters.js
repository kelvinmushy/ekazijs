import React from 'react';
import RecruiterCard from './RecruiterCard'; // Import the RecruiterCard component
import {Container } from 'react-bootstrap';

const FeaturedRecruiters = () => {
  const recruiters = [
    {
      imgSrc: 'https://ejobsitesoftware.com/jobboard_demo/image.php?image_name=banner/20230710073459target-logo-vector-01.png&size=130',
      altText: 'Banner7',
      link: 'https://ejobsitesoftware.com/jobboard_demo/adclicks.php?bID=48',
      title: 'Target'
    },
    {
      imgSrc: 'https://ejobsitesoftware.com/jobboard_demo/image.php?image_name=banner/20230710073900kelloggs-company-vector-logo-200x200.png&size=130',
      altText: 'Banner16',
      link: 'https://ejobsitesoftware.com/jobboard_demo/adclicks.php?bID=57',
      title: 'Kelloggs'
    },
    // Add more recruiters here
  ];

  return (
    <Container>
    <div className="row text-center mt-5">
      <div className="col-lg-12 d-flex align-items-center mb-3">
        <h2 className="m-0 m-font-size1 mpt-20" style={{ fontSize: '30px' }}>
          Featured Recruiters
        </h2>
        <div className="d-flex ms-auto">
          <button
            aria-label="All Recruiters"
            className="btn btn-text border"
            onClick={() =>
              (window.location.href =
                'https://ejobsitesoftware.com/jobboard_demo/jobs-by-company/')
            }
          >
            <span className="m-none">All recruiters</span>{' '}
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* Map through the recruiters array */}
      {recruiters.map((recruiter, index) => (
        <RecruiterCard
          key={index}
          imgSrc={recruiter.imgSrc}
          altText={recruiter.altText}
          link={recruiter.link}
          title={recruiter.title}
        />
      ))}
    </div>
    </Container>
  );
};

export default FeaturedRecruiters;
