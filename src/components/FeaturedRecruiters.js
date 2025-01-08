import React, { useEffect, useState } from 'react';
import RecruiterCard from './RecruiterCard'; // Import the RecruiterCard component
import { Container, Button, Spinner } from 'react-bootstrap';
import { fetchAllEmployer } from '../api/api'; // Import the fetch function

const FeaturedRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchAll, setFetchAll] = useState(false); // State to toggle between limited and full fetching

  // Fetch recruiters on component mount or when fetchAll changes
  useEffect(() => {
    const fetchRecruiters = async () => {
      setLoading(true);
      try {
        // Call API with fetchAll parameter
        const data = await fetchAllEmployer(fetchAll);
        setRecruiters(data);
      } catch (error) {
        console.error('Error fetching recruiters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiters();
  }, [fetchAll]);

  return (
    <Container>
      <div className="row text-center mt-5">
        <div className="col-lg-12 d-flex align-items-center mb-3">
          <h2 className="m-0 m-font-size1 mpt-20" style={{ fontSize: '30px' }}>
            Featured Recruiters
          </h2>
          <div className="d-flex ms-auto">
            <Button
              aria-label="Toggle Recruiters"
              variant="outline-primary"
              onClick={() => setFetchAll((prev) => !prev)}
            >
              {fetchAll ? 'Show Limited (12)' : 'Show All'}
            </Button>
          </div>
        </div>

        {/* Show loading spinner while fetching data */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        ) : (
          // Map through the recruiters array
          recruiters.map((recruiter, index) => (
            <RecruiterCard
              key={index}
              imgSrc={recruiter.logo}
              altText={recruiter.company_name}
              link={recruiter.id}
              title={recruiter.company_name}
            />
          ))
        )}
      </div>
    </Container>
  );
};

export default FeaturedRecruiters;
