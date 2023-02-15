import React from 'react'
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useState } from 'react';
import axios from 'axios';

const Animal = ({ animal }) => {

  const [updatedAnimal, setUpdatedAnimal] = useState({});

  // Edit modal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Update animal listing
  const updateAnimal = (animal) => {
    setUpdatedAnimal(animal);
    handleShow();
  };

  // Delete animal listing
  const deleteAnimal = (id) => {
    console.log(id);

    axios
      .delete(`/animals/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };
    
  // Handle form change when editing animal listing
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedAnimal((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Save updated animal listing
  const saveUpdatedAnimal = () => {
    console.log(updatedAnimal);

    // 404 Error
    // axios
    //     .put(`/animals/${updatedAnimal._id}`, updatedAnimal)
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err))

    console.log("animal updated");

    handleClose();
    // window.location.reload()
  };

    return (
        <>
        {/* Update animal listing modal */}
        <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Update Animal Listing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Control
                  placeholder="name"
                  name="name"
                  value={updatedAnimal.name ? updatedAnimal.name : ""}
                  onChange={handleChange}
                />
                <Form.Control
                  placeholder="type"
                  name="type"
                  value={updatedAnimal.type ? updatedAnimal.type : ""}
                  onChange={handleChange}
                />
                <Form.Control
                  placeholder="Age"
                  name="age"
                  value={updatedAnimal.age ? updatedAnimal.age : ""}
                  onChange={handleChange}
                />
                <Form.Control
                  placeholder="Sex"
                  name="sex"
                  value={updatedAnimal.sex ? updatedAnimal.sex : ""}
                  onChange={handleChange}
                />
                <Form.Control
                  placeholder="Medications"
                  name="medications"
                  value={
                    updatedAnimal.medications ? updatedAnimal.medications : ""
                  }
                  onChange={handleChange}
                />
                <Form.Control
                  placeholder="Notes"
                  name="notes"
                  value={updatedAnimal.notes ? updatedAnimal.notes : ""}
                  onChange={handleChange}
                />
                <Form.Control
                  placeholder="Photo"
                  name="photo"
                  value={updatedAnimal.photo ? updatedAnimal.photo : ""}
                  onChange={handleChange}
                />
                <Form.Select
                  value={updatedAnimal.adopted ? "Adopted!" : "Ready to adopt"}
                  onChange={handleChange}
                >
                  <option>Ready to adopt</option>
                  <option>Adopted!</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={saveUpdatedAnimal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
            
        {/* Display individual animal card */}
        <div key={animal._id} style={{ padding: "1rem" }}>
          <Card>
            {animal.photo ? (
              <Card.Img variant="top" src={animal.photo} alt={animal.name} />
            ) : (
              <p>"No image to display"</p>
            )}
            <Card.Body>
              <Card.Header>{animal.name}</Card.Header>
              <br />
              <Card.Title>Type</Card.Title>
              <Card.Text>{animal.animalType}</Card.Text>
              <Card.Title>{animal.age} years old</Card.Title>
              <Card.Title>Sex</Card.Title>
              <Card.Text>{animal.sex}</Card.Text>
              <Card.Title>Medication</Card.Title>
              <Card.Text>{animal.medications}</Card.Text>
              <Card.Title>Notes</Card.Title>
              <Card.Text>{animal.notes}</Card.Text>
              <Card.Title>Adoption status</Card.Title>
              <Card.Text>
                {animal.adopted ? "Adopted!" : "Ready to adopt"}
              </Card.Text>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="outline-info"
                  onClick={() => {
                    updateAnimal(animal);
                  }}
                  style={{ marginRight: "1rem" }}
                >
                  UPDATE
                </Button>
                <Button
                  onClick={() => deleteAnimal(animal._id)}
                  variant="outline-danger"
                >
                  DELETE
                </Button>
              </div>
            </Card.Body>
          </Card>
          <br />
        </div>
      </>
    );
}

export default Animal