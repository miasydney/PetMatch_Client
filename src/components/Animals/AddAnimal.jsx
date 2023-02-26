import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackBtn from "../BackBtn";

const AddAnimal = () => {
  const navigate = useNavigate();

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

  // Handle errors
  const [errors, setErrors] = useState({});
  const requiredFields = [
    "name",
    "animalType",
    "age",
    "sex",
    "medications",
    "notes",
    "photo",
  ];

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setAnimal((prev) => {
      return {
        ...prev,
        [name]: type === "file" ? files[0] : value,
      };
    });

    // Clear any error message when the user starts typing again
    setErrors((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
  };

  // Post animal data to API on form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // check if required fields are empty
    requiredFields.forEach((field) => {
      if (!animal[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // display error messages for any empty fields
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create form data object and append animal properties to it
    const formData = new FormData();
    formData.append("name", animal.name);
    formData.append("animalType", animal.animalType);
    formData.append("age", animal.age);
    formData.append("sex", animal.sex);
    formData.append("medications", animal.medications);
    formData.append("notes", animal.notes);
    formData.append("photo", animal.photo);

    console.log("animal data: ", animal);
    console.log("Form Submitted");

    // Post form data to animals endpoint
    axios
      .post("/animals", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("/animals");
  };

  return (
    <>
      <div style={{ width: "85%", margin: "auto auto", textAlign: "left" }}>
        <BackBtn />
        {/* Add New Animal Form */}
        <h1>Add New Animal</h1>
        <p>Please enter in all relevant information about the animal.</p>
        <Form encType="multipart/formdata">
          <Form.Group>
            <Form.Label>Animal Name</Form.Label>
            <Form.Control
              name="name"
              value={animal.name}
              placeholder="Enter Name"
              onChange={handleChange}
            ></Form.Control>
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control
              name="animalType"
              value={animal.animalType}
              placeholder="Type"
              onChange={handleChange}
            ></Form.Control>
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
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
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Sex</Form.Label>
            <Form.Control
              name="sex"
              value={animal.sex}
              placeholder="Sex"
              onChange={handleChange}
            ></Form.Control>
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
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
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
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
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="photo"
              onChange={handleChange}
            ></Form.Control>
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
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
    </>
  );
};

export default AddAnimal;
