import EmployerSidebar from "./EmployerSidebar";
import JobList from "../job/JobList";
import {  Container, Row, Col,} from 'react-bootstrap';
import React, { useState } from 'react';

const EmployerListOfJobs=()=>{

    const [selectedJobId, setSelectedJobId] = useState(null);

    const jobs = [
      { id: 1, title: 'Software Engineer', description: 'Develop software applications.', company: 'Tech Corp', location: 'San Francisco' },
      { id: 2, title: 'Product Manager', description: 'Manage product development.', company: 'Innovate Inc.', location: 'New York' },
      // Add more job objects as needed
    ];
  
    const handleView = (id) => {
      // Handle view action (e.g., navigate to a detail page)
      console.log('View job with ID:', id);
    };
  
    const handleEdit = (id) => {
      // Handle edit action (e.g., open an edit form)
      console.log('Edit job with ID:', id);
    };
  
    const handleDelete = (id) => {
      // Handle delete action (e.g., remove job from the list)
      console.log('Delete job with ID:', id);
    };
  
    const handleSelect = (id) => {
      // Handle select action (e.g., mark job as selected)
      setSelectedJobId(id);
      console.log('Selected job with ID:', id);
    };
  
    return (
         
      <Container className="my-4">
      <Row>
        <Col md={3} className="mt-4">
          <EmployerSidebar />
        </Col>
        <Col md={9} className="mt-4">
          <JobList 
            jobs={jobs} 
            onView={handleView} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            onSelect={handleSelect} 
          />
          {selectedJobId && <p className="mt-3">Selected Job ID: {selectedJobId}</p>}
        </Col>
      </Row>
    </Container>
      
    );
  };
export default EmployerListOfJobs;