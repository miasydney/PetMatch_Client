import React, {useState, useEffect} from 'react'
import axios from "axios";
import { Card } from 'react-bootstrap';
import getCurrentDate from "../utils/dateUtils.js";
import getEarliestAnimals from '../utils/animalUtils';
import { useGlobalContext } from "../utils/globalStateContext";


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
      <div style={{ width: "85%", margin: "auto auto", textAlign: "left" }}>
        <h1>{store.userRole === "admin" ? "Admin" : "Employee"} Dashboard</h1>
        <p>{currentDate}</p>
        <h3>Quick links</h3>
        <ul>
          <li>
            <a href="/animals">View all animals</a>
          </li>
          <li>
            <a href="/add-animal">Add new animal</a>
          </li>

          {/* If user is Admin, allow manage employee options */}
          {store.userRole === 'admin' && (
          <>
            <li>
              <a href="/employees">Manage All Employee accounts</a>
            </li>
            <li>
              <a href="/add-employee">Add New Employee account</a>
            </li>
          </>
          )}

        </ul>

        <h3>Longest residents</h3>
        <p>
          These animals have been with you the longest and are up for priority
          adoption.
        </p>
        <div>
          {earliestAnimals.length > 0 ? (
            <div className="card-container">
              {earliestAnimals.map((animal) => (
                <Card key={animal._id}>
                  <h2>{animal.name}</h2>
                  <p>{animal.notes}</p>
                </Card>
              ))}
            </div>
          ) : (
            <p>No animals found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard