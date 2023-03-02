import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import AnimalList from "./AnimalList";

jest.mock("axios");

describe("AnimalList", () => {
    it("should display a message when there are no animals", async () => {
      // Render animal list component 
    axios.get.mockResolvedValue({ data: [] });
        render(<AnimalList />);
        
    // Display correct message as there is no data returned
    await waitFor(() =>
      expect(
        screen.getByText("There are currently no animals to display.")
      ).toBeInTheDocument()
    );
  });

    it("should display a list of animals when there are animals", async () => {
      
    // Set test values for animals array
    const animals = [
      {
        _id: "1",
        name: "Fluffy",
        type: "Cat",
        age: 3,
        sex: "Female",
        medications: "None",
        notes: "Very friendly!",
        adopted: false,
        photo: {
          filename: "fluffy.jpg",
        },
      },
      {
        _id: "2",
        name: "Max",
        type: "Dog",
        age: 5,
        sex: "Male",
        medications: "None",
        notes: "Very friendly dog!",
        adopted: false,
        photo: {
          filename: "max.jpg",
        },
      },
    ];
    
    // Test that animals array is fetched correctly with axios
    axios.get.mockResolvedValue({ data: animals });
        
    render(<AnimalList />);

    // Expect title to be in rendered
    await waitFor(() =>
      expect(screen.getByText("Viewing all animals")).toBeInTheDocument()
    );
        
    // Check that both animals fetched from animals array render to screen 
    expect(screen.getByText("Fluffy")).toBeInTheDocument()
    expect(screen.getByText("Max")).toBeInTheDocument()
        
  });
});
