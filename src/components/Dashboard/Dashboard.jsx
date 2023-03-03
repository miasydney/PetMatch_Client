import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, ListGroup, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import getCurrentDate from "../../utils/dateUtils.js";
import getEarliestAnimals from "../../utils/animalUtils";
import { useGlobalContext } from "../../utils/globalStateContext";
import "./dashboard.css"
import { FaPlus, FaUserPlus, FaThList, FaDog } from "react-icons/fa";
import placeholder from "../../assets/placeholder.jpg";


const Dashboard = () => {
  // Retrieve list of animals from API
  const [animals, setAnimals] = useState([]);
  useEffect(() => {
    axios
      .get("/animals")
      .then((res) => {
        console.log(res);
        setAnimals(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Access the user's details from global context
  const { store } = useGlobalContext();

  // Return list of animals that were created the earliest
  const earliestAnimals = getEarliestAnimals(animals);

  // Return todays' date
  const currentDate = getCurrentDate();

  return (
    <>
      <div id="dash-div">
        <h1>{store.userRole === "admin" ? "Admin" : "Employee"} Dashboard</h1>
        <p>You are currently signed in as {store.loggedInUserName}.</p>
        <p>{currentDate}</p>

        <h3>Quick Links</h3>
        <Card className="quick-links-card">
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <FaDog />
                <Link to="/animals">View all animals</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <FaPlus />
                <Link to="/add-animal">Add new animal</Link>
              </ListGroup.Item>

              {/* If user is Admin, allow manage employee options */}
              {store.userRole === "admin" && (
                <>
                  <ListGroup.Item>
                    <FaThList />
                    <Link to="/employees">Manage All Employee accounts</Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FaUserPlus />
                    <Link to="/add-employee">Add New Employee account</Link>
                  </ListGroup.Item>
                </>
              )}
            </ListGroup>
          </Card.Body>
        </Card>

        <h3>Longest residents</h3>
        <p>
          These animals have been with you the longest and are up for priority
          adoption.
        </p>
        <div>
          {earliestAnimals.length > 0 ? (
            <div className="card-container">
              <CardGroup>
                {earliestAnimals.map((animal) => (
                  <Card key={animal._id}>
                    <Card.Body>
                      <Card.Img
                        variant="top"
                        src={
                          animal.photo.filename
                            ? `https://petmatch-production-6ea7.up.railway.app/uploads/${animal.photo.filename}`
                            : `${placeholder}`
                        }
                        thumbnail
                        crossorigin="anonymous"
                      />
                      <Card.Title>{animal.name}</Card.Title>
                      <Card.Text>Age: {animal.age}</Card.Text>
                      <Card.Text>Notes: {animal.notes}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </CardGroup>
            </div>
          ) : (
            <p>No animals found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
