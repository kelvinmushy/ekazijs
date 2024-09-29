import React, { useState, useEffect } from 'react';
import Layout from '../../AdminLayout/Layout';
import { Modal, Button, Form, Table, Card, Spinner } from 'react-bootstrap';

const PositionLevel = () => {
  const [positionLevels, setPositionLevels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPositionLevel, setCurrentPositionLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPositionLevels = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/admin/resource/position-levels');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPositionLevels(data);
    } catch (error) {
      console.error('Error fetching position levels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPositionLevels();
  }, []);

  const openModal = (positionLevel = null) => {
    setCurrentPositionLevel(positionLevel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentPositionLevel(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:4000/api/admin/resource/position-level';

    try {
      let response;
      if (currentPositionLevel?.id) {
        response = await fetch(`${url}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: currentPositionLevel.id,
            position_name: currentPositionLevel.position_name,
            updator_id: '1', // Adjust as necessary
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setPositionLevels(positionLevels.map(level =>
          level.id === currentPositionLevel.id ? { ...level, position_name: currentPositionLevel.position_name } : level
        ));
        console.log("Position level updated successfully");
      } else {
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            position_name: currentPositionLevel.position_name,
            creator_id: '2', // Adjust as necessary
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // const newPositionLevel = await response.json();
        // setPositionLevels([...positionLevels, newPositionLevel]);
       
        console.log("Position level added successfully");
        getPositionLevels();
      }

      closeModal();
    } catch (error) {
      console.error('Error saving position level:', error);
    }
  };

  const handleDelete = async (id) => {

    
    const confirmDelete = window.confirm('Are you sure you want to delete this state?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/resource/position-level/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setStates(states.filter(state => state.id !== id));
      } catch (error) {
        console.error('Error deleting state:', error);
      }
    }
  };


  return (
    <Layout>
      <div className="content">
        <Card>
          <Card.Header>
            <h4 className="mb-4">Manage Position Levels</h4>
          </Card.Header>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Loading...</p>
            </div>
          ) : (
            <Card.Body>
              <Button variant="success" onClick={() => openModal()} className="mb-3">Add Position Level</Button>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {positionLevels.map(level => (
                    <tr key={level.id}>
                      <td>{level.position_name}</td>
                      <td>
                        <Button variant="warning" onClick={() => openModal(level)}>Edit</Button>
                        <Button variant="danger" onClick={() => handleDelete(level.id)} className="ms-2">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          )}
        </Card>
        <Modal show={isModalOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{currentPositionLevel ? 'Edit Position Level' : 'Add Position Level'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formPositionLevelName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={currentPositionLevel ? currentPositionLevel.position_name : ''}
                  onChange={(e) => setCurrentPositionLevel({ ...currentPositionLevel, position_name: e.target.value })}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-2">
                {currentPositionLevel ? 'Update' : 'Add'} Position Level
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  );
};

export default PositionLevel;
