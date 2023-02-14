import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import NavBar from './NavBar'
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
      <NavBar />
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
                {employee.username} ({employee.roles})
              </span>
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