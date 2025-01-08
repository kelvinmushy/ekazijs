import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import JobCategoryCard from './JobCategoryCard'; // Import JobCategoryCard
import { fetchAllIndustry } from '../api/api'; // Import the fetch function

const JobCategoryList = () => {
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Fetch industries data on component mount
    const loadCategories = async () => {
      try {
        const data = await fetchAllIndustry();
        const groupedCategories = groupCategories(data); // Group categories for layout
        setCategories(groupedCategories);
      } catch (error) {
        console.error("Error fetching industries:", error);
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
          <Button
            variant="outline-primary"
            onClick={() =>
              (window.location.href =
                'https://ejobsitesoftware.com/jobboard_demo/job-search-by-industry/')
            }
          >
            All categories <i className="bi bi-arrow-right"></i>
          </Button>
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
                  link={category.link}
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
