import React, { useEffect, useState } from "react";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Animal from "./Animal";

const AnimalList = () => {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);

  // Retrieve list of all animals
  useEffect(() => {
    axios
      .get("/animals")
      .then((res) => {
        console.log(res);
        setAnimals(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div style={{ width: "60%", margin: "auto auto", textAlign: "left" }}>
        <Button variant="outline-dark" onClick={() => navigate(-1)}>
          BACK
        </Button>

        <h1>Viewing all animals</h1>
        {animals.length > 0 ? (
          <>
            {animals.map((animal) => {
              return <Animal key={animal._id} animal={animal} />;
            })}
          </>
        ) : (
          <p> There are currently no animals to display.</p>
        )}
      </div>
    </>
  );
};

export default AnimalList;
