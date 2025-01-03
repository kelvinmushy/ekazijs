import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Table, Container, Spinner, Modal, Form, Row, Col } from "react-bootstrap";
import { UniversalDataContext } from "../../context/UniversalDataContext";

const GetAllApplicant = () => {
  const {
    countries,
    states,
    genders,
    experiences,
    categories,
  } = useContext(UniversalDataContext);

  const [applicants, setApplicants] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  
  const [showFilter, setShowFilter] = useState(false); // Modal visibility state
  const [filters, setFilters] = useState({
    country_id: "",
    region_id: "",
    gender_id: "",
    experience_id: "",
    category_id: "",
    first_name: "",
    last_name: "",
    email: ""
  });

  // Default filter values to reset form to initial state
  const defaultFilters = {
    country_id: "",
    region_id: "",
    gender_id: "",
    experience_id: "",
    category_id: "",
    first_name: "",
    last_name: "",
    email: ""
  };

  // Fetch applicants based on the page and applied filters
  const fetchApplicants = async (page, filters = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:4000/api/universals/all-applicants?page=${page}&country_id=${filters.country_id}&region_id=${filters.region_id}&gender_id=${filters.gender_id}&experience_id=${filters.experience_id}&category_id=${filters.category_id}&first_name=${filters.first_name}&last_name=${filters.last_name}&email=${filters.email}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applicants. Please try again later.");
      }

      const data = await response.json();
      if (data.success) {
        setApplicants(data.data);
        setPagination(data.pagination);
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants(page, filters);
  }, [page, filters]);

  const handleNextPage = () => {
    if (pagination.nextPage) setPage(pagination.nextPage);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterSubmit = () => {
    setShowFilter(false);
    fetchApplicants(1, filters); // Reset to the first page when applying filters
  };

  const handleFilterReset = () => {
    setFilters(defaultFilters); // Reset filters to default values
  };

  return (
    <Container>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : (
        <Card className="shadow-sm">
       <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
  <h5 className="mb-0">Applicant List</h5>
  <Button variant="secondary" onClick={() => setShowFilter(true)} className="ml-auto">
    Filter
  </Button>
</Card.Header>
          <Card.Body>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Region</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {applicants.length > 0 ? (
                  applicants.map((applicant) => (
                    <tr key={applicant.id}>
                      <td>
                        <img
                          src={applicant.logo ? `http://localhost:4000${applicant.logo}` : 'https://via.placeholder.com/100'}
                          alt="Logo"
                          style={{ width: '50px', borderRadius: '0.5rem' }}
                        />
                      </td>
                      <td>{applicant.first_name} {applicant.last_name}</td>
                      <td>{applicant.email}</td>
                      <td>{applicant.phone_number}</td>
                      <td>{applicant.address}</td>
                      <td>{applicant.region_name}</td>
                      <td>{applicant.country_name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No applicants found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between align-items-center">
            <Button
              variant="primary"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span>Page {page}</span>
            <Button
              variant="primary"
              onClick={handleNextPage}
              disabled={!pagination.nextPage}
            >
              Next
            </Button>
          </Card.Footer>
        </Card>
      )}

      {/* Filter Modal */}
      <Modal show={showFilter} onHide={() => setShowFilter(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Applicants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              {/* First Column for Country, Region, and Gender */}
              <Col md={4}>
                <Form.Group controlId="filterCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control as="select" name="country_id" value={filters.country_id} onChange={handleFilterChange}>
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="filterRegion">
                  <Form.Label>Region</Form.Label>
                  <Form.Control as="select" name="region_id" value={filters.region_id} onChange={handleFilterChange}>
                    <option value="">Select Region</option>
                    {states
                      .filter(state => state.countryId === Number(filters.country_id)) // Filter states by selected country
                      .map((state) => (
                        <option key={state.id} value={state.id}>{state.name}</option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="filterGender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control as="select" name="gender_id" value={filters.gender_id} onChange={handleFilterChange}>
                    <option value="">Select Gender</option>
                    {genders.map((gender) => (
                      <option key={gender.id} value={gender.id}>{gender.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {/* Second Column for Experience, Category, and Name Fields */}
              <Col md={4}>
                <Form.Group controlId="filterExperience">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control as="select" name="experience_id" value={filters.experience_id} onChange={handleFilterChange}>
                    <option value="">Select Experience</option>
                    {experiences.map((experience) => (
                      <option key={experience.id} value={experience.id}>{experience.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="filterCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select" name="category_id" value={filters.category_id} onChange={handleFilterChange}>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="filterFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={filters.first_name}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {/* Third Column for Last Name and Email */}
              <Col md={4}>
                <Form.Group controlId="filterLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={filters.last_name}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="filterEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={filters.email}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilter(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleFilterReset}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleFilterSubmit}>
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GetAllApplicant;
