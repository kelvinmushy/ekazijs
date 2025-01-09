import React, { useEffect, useState } from 'react';
import RecruiterCard from './RecruiterCard'; // Import the RecruiterCard component
import { Container, Button, Spinner } from 'react-bootstrap';
import { fetchAllEmployer } from '../api/api'; // Import the fetch function

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

const FeaturedRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchAll, setFetchAll] = useState(false); // State to toggle between limited and full fetching

  useEffect(() => {
    const fetchRecruiters = async () => {
      setLoading(true);

      const cacheKey = `recruiters_${fetchAll}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);

        // Check if the cache is still valid
        if (Date.now() - parsedData.timestamp < CACHE_DURATION) {
          setRecruiters(parsedData.data);
          setLoading(false);
          return;
        }
      }

      try {
        // Fetch new data from the API
        const data = await fetchAllEmployer(fetchAll);
        setRecruiters(data);

        // Save data with a timestamp to local storage
        const dataToStore = {
          data,
          timestamp: Date.now(),
        };
        localStorage.setItem(cacheKey, JSON.stringify(dataToStore));
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

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        ) : (
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
