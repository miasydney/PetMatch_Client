import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import AddAnimal from "./AddAnimal";

jest.mock("axios");

describe("AddAnimal component", () => {
    it("renders AddAnimal correctly with expected title, fields and submit button", () => {
      
    // Render AddAnimal component    
    render(
      <BrowserRouter>
        <AddAnimal />
      </BrowserRouter>
    );

    // Check for title
    expect(screen.getByText("Add New Animal")).toBeInTheDocument();
        
    // Check for each form field to be present
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText("Sex")).toBeInTheDocument();
    expect(screen.getByLabelText("Medications")).toBeInTheDocument();
    expect(screen.getByLabelText("Notes")).toBeInTheDocument();
    expect(screen.getByLabelText("Image")).toBeInTheDocument();
        
    // Check for Add Animal button to submit form
    expect(screen.getByText("ADD ANIMAL")).toBeInTheDocument();
  });

    it("displays error messages if required fields are empty", () => {
    // Render component
    render(
      <BrowserRouter>
        <AddAnimal />
      </BrowserRouter>
    );

    // Submit form without entering any information
    const submitButton = screen.getByText("ADD ANIMAL");
    fireEvent.click(submitButton);

    // Check that all 7 fields show error message correctly
    expect(screen.getAllByText("This field is required")).toHaveLength(7);
  });

  it("should successfully add a new animal if all required fields are provided", async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <AddAnimal />
      </BrowserRouter>
    );

    fireEvent.change(getByLabelText("Name"), {
      target: { value: "Test animal" },
    });
    fireEvent.change(getByLabelText("Type"), {
      target: { value: "Dog" },
    });
    fireEvent.change(getByLabelText("Age"), {
      target: { value: "2" },
    });
    fireEvent.change(getByLabelText("Sex"), {
      target: { value: "Male" },
    });
    fireEvent.change(getByLabelText("Medications"), {
      target: { value: "Ibuprofen" },
    });
    fireEvent.change(getByLabelText("Notes"), {
      target: { value: "This is a test animal." },
    });
    fireEvent.change(getByLabelText("Image"), {
      target: {
        files: [
          new File(["test-photo"], "test-photo.png", {
            type: "image/png",
          }),
        ],
      },
    });

    fireEvent.click(getByText("ADD ANIMAL"));

    // await waitFor(() => {
    //   expect(axios.post).toHaveBeenCalledWith("/animals", expect.any(FormData));
    // });
  });
});
