import React, { useEffect, useState } from 'react'
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Animals = () => {

    const navigate = useNavigate()

    const [animals, setAnimals] = useState([])

    // retrieve animals list with get request to /animals from API
    useEffect(() => {
        axios.get("/animals")
            .then((res) => {
                console.log(res)
                setAnimals(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    // send delete request to remove listing using animal id
    const deleteAnimal = (id) => {
        console.log(id)

        axios
          .delete(`/animals/${id}`)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        
        window.location.reload();
    }
    

  return (
    <div style={{ width: "60%", margin: "auto auto", textAlign: "left"}}>
      <Button variant="outline-dark" onClick={() => navigate(-1)}>
        BACK
      </Button>
      <h1>Viewing all animals</h1>
      {animals ? (
        <>
          {animals.map((animal) => {
            return (
                <div key={animal._id} style={{ padding: "1rem" }}>
                <Card>
                  {animal.photo ? (
                    <Card.Img
                      variant="top"
                      src={animal.photo}
                      alt={animal.name}
                    />
                  ) : (
                    <p>"No image to display"</p>
                  )}
                  <Card.Body>
                    <Card.Header>{animal.name}</Card.Header>
                    <br />
                    <Card.Title>Type</Card.Title>
                    <Card.Text>{animal.animalType}</Card.Text>
                    <Card.Title>{animal.age} years old</Card.Title>
                    <Card.Title>Sex</Card.Title>
                    <Card.Text>{animal.sex}</Card.Text>
                    <Card.Title>Medication</Card.Title>
                    <Card.Text>{animal.medications}</Card.Text>
                    <Card.Title>Notes</Card.Title>
                    <Card.Text>{animal.notes}</Card.Text>
                    <Card.Title>Adoption status</Card.Title>
                    <Card.Text>
                      {animal.adopted ? "Adopted!" : "Ready to adopt"}
                    </Card.Text>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        variant="outline-info"
                        style={{ marginRight: "1rem" }}
                      >
                        UPDATE
                      </Button>
                      <Button
                        onClick={() => deleteAnimal(animal._id)}
                        variant="outline-danger"
                      >
                        DELETE
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
                <br />
              </div>
            );
          })}
        </>
      ) : (
        <p> There are currently no animals to display.</p>
      )}
    </div>
  );
}

export default Animals