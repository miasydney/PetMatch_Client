import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AddAnimal = () => {

    const navigate = useNavigate()
    
    const [animal, setAnimal] = useState({
      name: "",
      animalType: "",
      age: "",
      sex: "",
      medications: "",
      notes: "",
      photo: "",
      adopted: false,
    });


    // Handle form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        setAnimal((prev) => {
            return {
            ...prev,
            [name]: value,
            }
        })
    }

    // Post animal data to API on form submission
    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("animal data: ", animal)
        console.log("form submitted")

        axios.post("/animals", animal)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        
        navigate("/animals")
    }

  return (
    <div style={{width: "85%", margin: "auto auto", textAlign: "left"}}>
      <Button variant="outline-dark" onClick={() => navigate(-1)}>
        BACK
      </Button>
      <h1>Add New Animal</h1>
      <p>Please enter in all relevant information about the animal.</p>
      <Form>
        <Form.Group>
          <Form.Label>Animal Name</Form.Label>
          <Form.Control
            name="name"
            value={animal.name}
            placeholder="Enter Name"
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Form.Control
            name="animalType"
            value={animal.animalType}
            placeholder="Type"
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Age</Form.Label>
          <Form.Control
            name="age"
            type="number"
            value={animal.age}
            placeholder="Age (if unknown, enter closest estimate)"
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Sex</Form.Label>
          <Form.Control
            name="sex"
            value={animal.sex}
            placeholder="Sex"
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Medications</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="medications"
            value={animal.medications}
            placeholder="Medications (please specify if none required)"
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={15}
            name="notes"
            value={animal.notes}
            placeholder="Notes"
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            // type="file"
            // accept="image/*"
            name="photo"
            value={animal.photo}
            placeholder="photo"
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Button
          variant="outline-success"
          type="submit"
          onClick={handleSubmit}
        >
          ADD ANIMAL
        </Button>
      </Form>
    </div>
  );
}

export default AddAnimal