import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AssessmentDetailsForm = ({
    show,
    onClose,
    onSubmit,
    assessmentDetails = {},
    setAssessmentDetails,
  }) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAssessmentDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Assessment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="assessmentType" className="mb-3">
              <Form.Label>Assessment Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={assessmentDetails.type || ''}
                onChange={handleChange}
                placeholder="e.g. Coding Test, Written Test"
                required
              />
            </Form.Group>
  
            <Form.Group controlId="assessmentDuration" className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={assessmentDetails.duration || ''}
                onChange={handleChange}
                placeholder="e.g. 1 hour"
                required
              />
            </Form.Group>
  
            <Form.Group controlId="assessmentLocation" className="mb-3">
              <Form.Label>Location/Link</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={assessmentDetails.location || ''}
                onChange={handleChange}
                placeholder="e.g. URL or in-person location"
                required
              />
            </Form.Group>
  
            <Form.Group controlId="assessmentInstructions" className="mb-3">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                as="textarea"
                name="instructions"
                value={assessmentDetails.instructions || ''}
                onChange={handleChange}
                placeholder="Provide instructions for the applicant"
                rows={3}
              />
            </Form.Group>
  
            <Form.Group controlId="assessmentDeadline" className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                value={assessmentDetails.deadline || ''}
                onChange={handleChange}
              />
            </Form.Group>
  
            <Form.Group controlId="assessmentEvaluationCriteria" className="mb-3">
              <Form.Label>Evaluation Criteria</Form.Label>
              <Form.Control
                as="textarea"
                name="evaluationCriteria"
                value={assessmentDetails.evaluationCriteria || ''}
                onChange={handleChange}
                placeholder="How will the assessment be evaluated?"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={onSubmit}>Save & Move</Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default AssessmentDetailsForm;
  