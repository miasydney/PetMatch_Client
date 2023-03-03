import React, { useEffect, useState } from "react";
import axios from "axios";
import Animal from "./Animal";

const AnimalList = () => {
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
      <div style={{ width: "70%", margin: "auto auto", textAlign: "left" }}>
        <h1>Viewing all animals</h1>
        {animals.length > 0 ? (
          <>
            {animals.map((animal) => {
              return (
                <Animal
                  key={animal._id}
                  animal={animal}
                  animals={animals}
                  setAnimals={setAnimals}
                />
              );
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
