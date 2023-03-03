import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Modal, Card, Table } from "react-bootstrap";
import axios from 'axios'
import { FaUserPlus } from "react-icons/fa";
import { BsExclamationTriangleFill } from "react-icons/bs";
import "./employees.css"

const Employees = () => {

  const [employees, setEmployees] = useState([]);

  // retrieve employees from API
  useEffect(() => {
    axios
      .get("/users")
        .then((res) => {
            console.log(res)
            setEmployees(res.data)
        })
      .catch((err) => console.log(err));
  }, []);

  // Edit employee
  const [updatedEmployee, setUpdatedEmployee] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const updateEmployee = (employee) => {
    setUpdatedEmployee(employee);
    handleShowEditModal();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setUpdatedEmployee((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedEmployee = () => {
    console.log(updatedEmployee)
    // Edit employee account after save
    axios
      .patch(`/users/${updatedEmployee.id}`, updatedEmployee)
      .then((res) => {
        console.log(res);
      // Set updated employee in setEmployees state
      const updatedEmployees = employees.map((employee) => {
        if (employee.id === updatedEmployee.id) {
          return updatedEmployee;
        } else {
          return employee;
        }
      });
        setEmployees(updatedEmployees);
        handleCloseEditModal();
      })
      .catch((err) => console.log(err));
  };

  // delete employee by id
  const deleteEmployee = (id) => {
    axios
      .delete(`/users/${id}`)
      .then((res) => {
        console.log(res);
        setEmployees((prev) => {
          return prev.filter((employee) => employee._id !== id);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="employee-div">
      {/* Edit employee modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={updatedEmployee.username}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicIsAdmin">
              <Form.Label>Select Role</Form.Label>
              <Form.Select
                name="isAdmin"
                value={updatedEmployee.isAdmin}
                onChange={handleFormChange}
              >
                <option value={true}>Admin</option>
                <option value={false}>Employee</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedEmployee}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <h1>Manage Employees</h1>
      <Card className="add-employee-card">
        <Link to="/add-employee">
          <FaUserPlus />
          <p>Add New Employee Account</p>
        </Link>
      </Card>

      <Card>
        <h2 id="employee-header">All Employees</h2>
        <p id="info">
          <BsExclamationTriangleFill />
          Please note that once you delete an employee account, the account will
          be permanently removed from your database and the user will no longer
          be able to sign in or access any information.
        </p>
        <div id="employee-table">
          {employees.length > 0 ? (
            <ul>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Access Level</th>
                    <th>Account Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee._id}>
                      <td>{employee.username}</td>
                      <td> {employee.isAdmin ? "Admin" : "Employee"}</td>
                      <td>
                        <Button
                          variant="outline-info"
                          onClick={() => updateEmployee(employee)}
                          style={{ marginRight: "1rem" }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => deleteEmployee(employee._id)}
                        >
                          Delete Account
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ul>
          ) : (
            <p>There are currently no employee accounts to display. </p>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Employees