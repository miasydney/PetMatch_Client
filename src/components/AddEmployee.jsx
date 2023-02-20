import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    username: "",
    password: "",
    isAdmin: false,
  });

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Post employee data to users on form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/users", employee) // { ...employee, isAdmin: employee.roles === 'Admin' }
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(employee)
      navigate("/employees");
      // window.location.reload();
  };
    
  // Note: Add front end validation to form to ensure that all fields are filled

  return (
    <>
      <NavBar />
      <div style={{ width: "85%", margin: "auto auto", textAlign: "left" }}>
        <Button variant="outline-dark" onClick={() => navigate(-1)}>
          BACK
        </Button>
        <h1>Add New Employee</h1>
        <p>
          You are creating a new employee account. All employees will have
          access to create, edit and delete all animal listings from your
          database.
        </p>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={employee.username}
              placeholder="Enter Employee Username"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={employee.password}
              placeholder="Enter New Employee Password"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="isAdmin"
              value={employee.isAdmin}
              onChange={(e) =>
                setEmployee({ ...employee, isAdmin: e.target.value === "true" })
              }
            >
              <option value="">Select a role</option>
              <option value={false}>Employee</option>
              <option value={true}>Admin</option>
            </Form.Select>
            <Form.Text>
              *Admin users will have access to manage employee accounts.
            </Form.Text>
          </Form.Group>

          <Button
            variant="outline-success"
            type="submit"
            onClick={handleSubmit}
          >
            ADD EMPLOYEE ACCOUNT
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddEmployee;
