import React, {useState, useEffect} from 'react'
import NavBar from './NavBar'
import axios from "axios";
import { Card } from 'react-bootstrap';

const Dashboard = () => {
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
        
    // Return list of animals that were created the earliest
    function getEarliestAnimals() {
    // Sort the animals by createdAt in ascending order (earliest to latest)
    const sortedAnimals = animals.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    const earliestAnimals = sortedAnimals.slice(0, 3);
    
    return earliestAnimals;
    }
        
    const earliestAnimals = getEarliestAnimals();

  return (
    <>
      <NavBar />
      <div style={{ width: "85%", margin: "auto auto", textAlign: "left" }}>
        <h1>User Dashboard</h1>
        <p>Wednesday, 30 July</p>
        <h3>Quick links</h3>
        <p> - View all animals</p>
        <p> - Add new animal</p>
        {/* if user is Admin */}
        <p> - Manage All Employee accounts </p>
        <p> - Add New Employee account </p>

        <h3>Longest residents</h3>
        <p>
          These animals have been with you the longest and are up for priority
          adoption.
        </p>
        <div>
          {earliestAnimals.length > 0 ? (
            <div className="card-container">
              {earliestAnimals.map((animal) => (
                <div key={animal._id} className="card">
                  <h2>{animal.name}</h2>
                  <p>{animal.notes}</p>
                </div>
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