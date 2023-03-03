import React from 'react'
import { Button, Card, Form, Image, Modal } from "react-bootstrap";
import { useState } from 'react';
import axios from 'axios';
import placeholder from "../../assets/placeholder.jpg";


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

    // Send updated animal information to API
    axios
      .patch(`/animals/${updatedAnimal._id}`, updatedAnimal)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log("animal updated");

    handleClose();
    window.location.reload();
  };


  return (
    <>
      {/* Update animal listing modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Updating {animal.name}'s Animal Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Image
              src={`http://localhost:3500/uploads/${animal.photo.filename}`}
              thumbnail
              rounded
            ></Image>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="name"
                name="name"
                value={updatedAnimal.name ? updatedAnimal.name : ""}
                onChange={handleChange}
              />
              <Form.Label>Type</Form.Label>
              <Form.Control
                placeholder="type"
                name="animalType"
                value={updatedAnimal.animalType ? updatedAnimal.animalType : ""}
                onChange={handleChange}
              />
              <Form.Label>Age</Form.Label>
              <Form.Control
                placeholder="Age"
                name="age"
                value={updatedAnimal.age ? updatedAnimal.age : ""}
                onChange={handleChange}
              />
              <Form.Label>Sex</Form.Label>
              <Form.Control
                placeholder="Sex"
                name="sex"
                value={updatedAnimal.sex ? updatedAnimal.sex : ""}
                onChange={handleChange}
              />
              <Form.Label>Medications</Form.Label>
              <Form.Control
                placeholder="Medications"
                name="medications"
                value={
                  updatedAnimal.medications ? updatedAnimal.medications : ""
                }
                onChange={handleChange}
              />
              <Form.Label>Notes</Form.Label>
              <Form.Control
                placeholder="Notes"
                name="notes"
                value={updatedAnimal.notes ? updatedAnimal.notes : ""}
                onChange={handleChange}
              />
              <Form.Label>Adoption Status</Form.Label>
              <Form.Select
                name="adopted"
                value={updatedAnimal.adopted}
                onChange={handleChange}
              >
                <option value={false}>Ready to adopt</option>
                <option value={true}>Adopted!</option>
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
          <Card.Img
            variant="top"
            src={
              animal.photo.filename
                ? `/uploads/${animal.photo.filename}`
                : `${placeholder}`
            }
            alt={animal.name}
            rounded
          />
          <Card.Body>
            <Card.Header>
              <h3>{animal.name}</h3>
            </Card.Header>
            <br />
            <Card.Title>Type</Card.Title>
            <Card.Text>{animal.animalType}</Card.Text>
            <Card.Title>Age</Card.Title>
            <Card.Text>{animal.age} years old</Card.Text>
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
            <Card.Footer>
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
            </Card.Footer>
          </Card.Body>
        </Card>
        <br />
      </div>
    </>
  );
}

export default Animal