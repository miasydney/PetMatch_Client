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
  const handleSubmit = async (e) => {
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

    try {
      const response = await axios.post("/animals", formData);
      console.log(response);
      navigate("/animals");
    } catch (error) {
      console.error(error);
    }
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
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              name="name"
              id="name"
              value={animal.name}
              placeholder="Enter Name"
              onChange={handleChange}
            ></Form.Control>
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="type">Type</Form.Label>
            <Form.Control
              name="animalType"
              id="type"
              value={animal.animalType}
              placeholder="Type"
              onChange={handleChange}
            ></Form.Control>
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="age">Age</Form.Label>
            <Form.Control
              name="age"
              id="age"
              type="number"
              value={animal.age}
              placeholder="Age (if unknown, enter closest estimate)"
              onChange={handleChange}
            ></Form.Control>
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
          </Form.Group>
          <Form.Group htmlFor="sex">
            <Form.Label htmlFor="sex">Sex</Form.Label>
            <Form.Control
              name="sex"
              id="sex"
              value={animal.sex}
              placeholder="Sex"
              onChange={handleChange}
            ></Form.Control>
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="medications">Medications</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="medications"
              id="medications"
              value={animal.medications}
              placeholder="Medications (please specify if none required)"
              onChange={handleChange}
            ></Form.Control>
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="notes">Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={15}
              name="notes"
              id="notes"
              value={animal.notes}
              placeholder="Notes"
              onChange={handleChange}
            ></Form.Control>
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="image">Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="photo"
              id="image"
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
