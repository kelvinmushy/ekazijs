import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
const ScreeningDetailsForm = ({
    show,
    onClose,
    onSubmit,
    screeningDetails = {},
    setScreeningDetails,
  }) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setScreeningDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Screening Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="screeningType" className="mb-3">
              <Form.Label>Screening Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={screeningDetails.type || ''}
                onChange={handleChange}
                placeholder="e.g. Phone Screen, Resume Review"
                required
              />
            </Form.Group>
  
            <Form.Group controlId="screeningOutcome" className="mb-3">
              <Form.Label>Screening Outcome</Form.Label>
              <Form.Select
                name="outcome"
                value={screeningDetails.outcome || ''}
                onChange={handleChange}
                required
              >
                <option value="">Select outcome</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
                <option value="needs_review">Needs Review</option>
              </Form.Select>
            </Form.Group>
  
            <Form.Group controlId="screeningNotes" className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={screeningDetails.notes || ''}
                onChange={handleChange}
                placeholder="Any additional comments"
                rows={3}
              />
            </Form.Group>
  
            <Form.Group controlId="followUpAction" className="mb-3">
              <Form.Label>Follow-up Action</Form.Label>
              <Form.Select
                name="followUpAction"
                value={screeningDetails.followUpAction || ''}
                onChange={handleChange}
                required
              >
                <option value="">Select action</option>
                <option value="move_to_interview">Move to Interview</option>
                <option value="move_to_assessment">Move to Assessment</option>
                <option value="reject">Reject</option>
              </Form.Select>
            </Form.Group>
  
            <Form.Group controlId="screeningDate" className="mb-3">
              <Form.Label>Screening Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={screeningDetails.date || ''}
                onChange={handleChange}
                required
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
  
  export default ScreeningDetailsForm;
  