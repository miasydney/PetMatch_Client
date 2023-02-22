import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, ListGroup, CardGroup } from "react-bootstrap";
import getCurrentDate from "../../utils/dateUtils.js";
import getEarliestAnimals from "../../utils/animalUtils";
import { useGlobalContext } from "../../utils/globalStateContext";
import "./dashboard.css"
import { FaPlus, FaUserPlus, FaThList, FaDog } from "react-icons/fa";


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
                <a href="/animals"> View all animals</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <FaPlus />
                <a href="/add-animal">Add new animal</a>
              </ListGroup.Item>

              {/* If user is Admin, allow manage employee options */}
              {store.userRole === "admin" && (
                <>
                  <ListGroup.Item>
                    <FaThList />
                    <a href="/employees">Manage All Employee accounts</a>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FaUserPlus />
                    <a href="/add-employee">Add New Employee account</a>
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
                      <Card.Img variant="top" src={animal.photo} />
                      <Card.Title>{animal.name}</Card.Title>
                      <Card.Text>Age: {animal.age}</Card.Text>
                      <Card.Text>Notes: {animal.notes}</Card.Text>

                      {/* <Animal animal={animal} />; */}
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