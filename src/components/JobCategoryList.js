import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import JobCategoryCard from './JobCategoryCard'; // Import JobCategoryCard
import { fetchAllIndustry } from '../api/api'; // Import the fetch function
import { Link } from 'react-router-dom';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

const JobCategoryList = () => {
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);

      const cacheKey = 'job_categories';
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);

        // Check if the cache is still valid
        if (Date.now() - parsedData.timestamp < CACHE_DURATION) {
          setCategories(parsedData.data);
          setLoading(false);
          return;
        }
      }

      try {
        // Fetch fresh data from the API
        const data = await fetchAllIndustry();
      
        const groupedCategories = groupCategories(data); // Group categories for layout
        setCategories(groupedCategories);

        // Save data with a timestamp to local storage
        const dataToStore = {
          data: groupedCategories,
          timestamp: Date.now(),
        };
        localStorage.setItem(cacheKey, JSON.stringify(dataToStore));
      } catch (error) {
        console.error('Error fetching industries:', error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    loadCategories();
  }, []);

  // Function to group categories into chunks of 3 for layout
  const groupCategories = (data) => {
    const chunkSize = 3;
    return data.reduce((result, item, index) => {
      const chunkIndex = Math.floor(index / chunkSize);
      if (!result[chunkIndex]) {
        result[chunkIndex] = [];
      }
      result[chunkIndex].push(item);
      return result;
    }, []);
  };

  if (loading) {
    return <p>Loading...</p>; // Display a loading message or spinner
  }

  return (
    <Container className="mt-5">
      {/* Categories Section */}
      <Row className="mb-3 d-flex align-items-center">
        <Col>
          <h2 style={{ fontSize: '30px' }}>Jobs by Categories</h2>
        </Col>
        <Col className="d-flex justify-content-end">
         
          <Link to="/home/all-category" className="btn btn-text border">All Industry</Link>
        </Col>
      </Row>

      {/* Job Categories */}
      <Row>
        {categories.map((categoryGroup, index) => (
          <Col md={4} key={index}>
            <div className="categories my-2">
              {categoryGroup.map((category, idx) => (
                <JobCategoryCard
                  key={idx}
                  name={category.category}
                  id={category.id}
                  slug={category.slug}
                  count={category.job_count}
                />
              ))}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default JobCategoryList;
