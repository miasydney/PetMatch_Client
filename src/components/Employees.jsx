import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios'


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
    axios
      .patch(`/users/${updatedEmployee.id}`, updatedEmployee)
      .then(() => {
        handleCloseEditModal();
        window.location.reload();
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
          return prev.filter((employee) => employee.id !== id);
        });
      })
        .catch((err) => console.log(err));
      
    window.location.reload();
  };

  return (
    <>
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
      <Link to="/add-employee">
        <Button variant="outline-success">Add Employee</Button>
      </Link>

      <h3>All Employees</h3>
      {employees.length > 0 ? (
        <ul>
          {employees.map((employee) => (
            <li key={employee._id}>
              <span>
                {employee.username} ({employee.isAdmin ? "Admin" : "Employee"})
              </span>
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
            </li>
          ))}
        </ul>
      ) : (
        <p>There are currently no employee accounts to display. </p>
      )}
    </>
  );
}

export default Employees