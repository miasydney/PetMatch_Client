import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import NavBar from './NavBar'

const Employees = () => {
    return (
      <>
        <NavBar />
        <div>Manage Employees</div>
        <Link to="/add-employee">
          <Button>Add Employee</Button>
        </Link>
      </>
    );
}

export default Employees