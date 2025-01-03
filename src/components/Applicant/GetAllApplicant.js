import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Table, Container, Spinner, Modal, Row, Col } from "react-bootstrap";
import { UniversalDataContext } from "../../context/UniversalDataContext";
import { useNavigate } from "react-router-dom"; // For navigation
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from "../../../src/styles/cv/template1.module.css"; // Assuming you have a CSS module

const GetAllApplicant = () => {
  const {
    countries,
    states,
    genders,
    experiences,
    maritalStatus, // Assuming marital statuses are in the context
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
    first_name: "",
    last_name: "",
    email: "",
    marital_id: "", // New marital status filter
  });

  const defaultFilters = {
    country_id: "",
    region_id: "",
    gender_id: "",
    experience_id: "",
    first_name: "",
    last_name: "",
    email: "",
    marital_id: "", // Reset marital status
  };

  const [applicantData, setApplicantData] = useState(null);
  const [educationalQualifications, setEducationalQualifications] = useState([]);
  const [professionalQualifications, setProfessionalQualifications] = useState([]);
  const [experiencesData, setExperiences] = useState([]);  // Renamed to avoid conflict
  const [languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [referees, setReferees] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate

  const fetchApplicants = async (page, filters = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:4000/api/universals/all-applicants?page=${page}&country_id=${filters.country_id}&region_id=${filters.region_id}&gender_id=${filters.gender_id}&experience_id=${filters.experience_id}&first_name=${filters.first_name}&last_name=${filters.last_name}&email=${filters.email}&marital_id=${filters.marital_id}`
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

  // Fetching individual applicant profile data
  const fetchApplicantData = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/${applicantId}`);
      const data = await response.json();
      setApplicantData(data[0] || null); // Set applicantData to null if no data is returned
    } catch (error) {
      console.error("Error fetching applicant data:", error);
    }
  };

  const fetchEducationalQualifications = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/educational-qualifications/${applicantId}`);
      const data = await response.json();
      setEducationalQualifications(data || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching educational qualifications:", error);
    }
  };

  const fetchProfessionalQualifications = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/professional-qualifications/${applicantId}`);
      const data = await response.json();
      setProfessionalQualifications(data || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching professional qualifications:", error);
    }
  };

  const fetchExperiences = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/experiences/${applicantId}`);
      const data = await response.json();
      setExperiences(data || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

  const fetchLanguages = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/languages/${applicantId}`);
      const data = await response.json();
      setLanguages(data || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const fetchSkills = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/skills/${applicantId}`);
      const data = await response.json();
      setSkills(data || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const fetchReferees = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/referees/${applicantId}`);
      const data = await response.json();
      setReferees(data || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching referees:", error);
    }
  };

  const fetchSocialMediaLinks = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/social-media/${applicantId}`);
      if (response.ok) {
        const data = await response.json();
        setSocialMediaLinks(data);
      } else {
        console.error("Error fetching social media links:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching applicant social media links:", error);
    }
  };

  // Handle clicking a row to view applicant profile
  const handleRowClick = (applicantId) => {
    // Fetch additional applicant data
    fetchApplicantData(applicantId);
    fetchEducationalQualifications(applicantId);
    fetchProfessionalQualifications(applicantId);
    fetchExperiences(applicantId);
    fetchLanguages(applicantId);
    fetchSkills(applicantId);
    fetchReferees(applicantId);
    fetchSocialMediaLinks(applicantId);

    // Open the modal
    setShowFilter(true);
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
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Region</th>
                </tr>
              </thead>
              <tbody>
                {applicants.length > 0 ? (
                  applicants.map((applicant) => (
                    <tr key={applicant.id} onClick={() => handleRowClick(applicant.id)}>
                      <td>
                        <img
                          src={applicant.logo ? `http://localhost:4000${applicant.logo}` : 'https://via.placeholder.com/100'}
                          alt="Logo"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      </td>
                      <td>{applicant.first_name} {applicant.last_name}</td>
                      <td>{applicant.email}</td>
                      <td>{applicant.phone_number}</td>
                      <td>{applicant.address}</td>
                      <td>{applicant.region_name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No applicants found</td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* Pagination */}
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={handlePreviousPage}
                disabled={!pagination.prevPage}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                onClick={handleNextPage}
                disabled={!pagination.nextPage}
              >
                Next
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Modal for applicant profile */}
      <Modal show={showFilter} onHide={() => setShowFilter(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Applicant Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {applicantData && (
            <div>
              <div className={styles.cvContainer}>
                <div className={styles.sidebar}>
                  <div className="profile">
                    <img
                      src={applicantData.profile_image ? `http://localhost:4000${applicantData.profile_image}` : 'https://via.placeholder.com/100'}
                      alt="Profile"
                      className={styles.profileImg}
                    />
                    <h2 className={styles.profileName}>{applicantData.first_name} {applicantData.last_name}</h2>
                    <p className={styles.profileTitle}>Senior Software Engineer</p>
                    <div className={styles.profileContact}>
                      <p>Email: {applicantData.email}</p>
                      <p>Phone: {applicantData.phone}</p>
                    </div>
                  </div>
                  <div className={styles.links}>
                    {socialMediaLinks.length > 0 ? (
                      socialMediaLinks.map((link) => (
                        <p key={link.id}>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                        </p>
                      ))
                    ) : (
                      <p>No social media links available</p>
                    )}
                  </div>
                </div>

                <div className={styles.mainContent}>
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>About Me</h3>
                    <p>{applicantData.about || "No about section provided."}</p>
                  </section>

                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Work Experience</h3>
                    <ul>
                      {experiencesData.map((experience) => (
                        <li key={experience.id}>
                          <h4>{experience.position} | {experience.institution}</h4>
                          <p><strong>{experience.from} - {experience.to}</strong></p>
                          <p>{experience.description}</p>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Education</h3>
                    <ul>
                      {educationalQualifications.map((qualification) => (
                        <li key={qualification.id}>
                          <h4>{qualification.degree}</h4>
                          <p><strong>{qualification.institution}</strong> | Graduated in {qualification.ended}</p>
                          <p>{qualification.description}</p>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Skills</h3>
                    <div className={styles.skills}>
                      {skills.map((skill) => (
                        <span key={skill.id} className={styles.skill}>{skill.skill_name}</span>
                      ))}
                    </div>
                  </section>

                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Certifications</h3>
                    <ul>
                      {professionalQualifications.map((qualification) => (
                        <li key={qualification.id}>
                          <h4>{qualification.course}</h4>
                          <p><strong>{qualification.institution}</strong> | {qualification.ended}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>

              {/* Button to generate PDF */}
            
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilter(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showFilter} onHide={() => setShowFilter(false)} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Filter Applicants</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Row>
      <Col sm={6} lg={4}>
        <label htmlFor="country_id">Country</label>
        <select
          id="country_id"
          name="country_id"
          className="form-control"
          value={filters.country_id}
          onChange={handleFilterChange}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </Col>

      <Col sm={6} lg={4}>
        <label htmlFor="region_id">Region</label>
        <select
          id="region_id"
          name="region_id"
          className="form-control"
          value={filters.region_id}
          onChange={handleFilterChange}
        >
          <option value="">Select Region</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </Col>

      <Col sm={6} lg={4}>
        <label htmlFor="gender_id">Gender</label>
        <select
          id="gender_id"
          name="gender_id"
          className="form-control"
          value={filters.gender_id}
          onChange={handleFilterChange}
        >
          <option value="">Select Gender</option>
          {genders.map((gender) => (
            <option key={gender.id} value={gender.id}>
              {gender.name}
            </option>
          ))}
        </select>
      </Col>

      <Col sm={6} lg={4}>
        <label htmlFor="experience_id">Experience</label>
        <select
          id="experience_id"
          name="experience_id"
          className="form-control"
          value={filters.experience_id}
          onChange={handleFilterChange}
        >
          <option value="">Select Experience</option>
          {experiences.map((exp) => (
            <option key={exp.id} value={exp.id}>
              {exp.title}
            </option>
          ))}
        </select>
      </Col>

      <Col sm={6} lg={4}>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          className="form-control"
          value={filters.first_name}
          onChange={handleFilterChange}
        />
      </Col>

      <Col sm={6} lg={4}>
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          className="form-control"
          value={filters.last_name}
          onChange={handleFilterChange}
        />
      </Col>

      <Col sm={6} lg={4}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={filters.email}
          onChange={handleFilterChange}
        />
      </Col>

      <Col sm={6} lg={4}>
        <label htmlFor="marital_id">Marital Status</label>
        <select
          id="marital_id"
          name="marital_id"
          className="form-control"
          value={filters.marital_id}
          onChange={handleFilterChange}
        >
          <option value="">Select Marital Status</option>
          {maritalStatus.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
      </Col>
    </Row>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={handleFilterReset}>
      Reset Filters
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
