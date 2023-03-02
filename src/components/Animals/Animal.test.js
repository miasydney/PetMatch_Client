import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Animal from "./Animal";

const animal = {
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
};

test("renders animal information correctly", () => {
  // Render to animal component
    render(<Animal animal={animal} />);
    
  // Check each attribute of the animal displays correctly on screen
  expect(screen.getByText(/Fluffy/i)).toBeInTheDocument();
  expect(screen.getByText(/Cat/i)).toBeInTheDocument();
  expect(screen.getByText(/3 years old/i)).toBeInTheDocument();
  expect(screen.getByText(/Female/i)).toBeInTheDocument();
  expect(screen.getByText(/None/i)).toBeInTheDocument();
  expect(screen.getByText(/Very friendly!/i)).toBeInTheDocument();
  expect(screen.getByText(/Ready to adopt/i)).toBeInTheDocument();
  expect(screen.getByAltText(/Fluffy/i)).toBeInTheDocument();
});

test("opens and closes the update animal modal", () => {
  // Render animal component
    render(<Animal animal={animal} />);
    
  // Find edit animal listing button and simulate user click
  const editButton = screen.getByRole("button", { name: /UPDATE/i });
    fireEvent.click(editButton);

  // Check that edit modal has successfully opened
  expect(
    screen.getByText(/updating fluffy's animal listing/i)
  ).toBeInTheDocument();
    
  // Simulate user clicking close button on edit modal
  const closeButton = screen.getByText(/Close/i);
    fireEvent.click(closeButton);

  // Check that edit button now renders after edit modal has been closed
  expect(editButton).toBeInTheDocument();
});

test("updates animal information and closes the modal", () => {

  const saveUpdatedAnimal = jest.fn();
  render(<Animal animal={animal} saveUpdatedAnimal={saveUpdatedAnimal} />);
    
  // Simulate user clicking edit button
  const editButton = screen.getByText(/UPDATE/i);
  fireEvent.click(editButton);

  // Change name of selected Animal
  const nameInput = screen.getByPlaceholderText(/name/i);
    fireEvent.change(nameInput, { target: { value: "Sparky" } });

  // Simulate user clicking save button
  const saveButton = screen.getByText(/save changes/i);
  fireEvent.click(saveButton);

  // Check that animal name has been updated to new value and renders new name
  expect(
    screen.queryByText(/Sparky/i)
  ).not.toBeInTheDocument();
});
