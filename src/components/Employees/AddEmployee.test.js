import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import AddEmployee from "./AddEmployee";

jest.mock("axios");

describe("AddEmployee component", () => {


    it("renders correctly", () => {
    // Render AddEmployee component inside router 
    render(
      <BrowserRouter>
        <AddEmployee />
      </BrowserRouter>
    );

    // Check that title is present
    expect(screen.getByText("Add New Employee")).toBeInTheDocument();
        
    // Check form fields are present
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
        
    // Check submit button is present
    expect(screen.getByText("ADD EMPLOYEE ACCOUNT")).toBeInTheDocument();
  });

  it("displays error messages if form is submitted with no values", () => {
    render(
      <BrowserRouter>
        <AddEmployee />
      </BrowserRouter>
    );

    // Simulate form submission with no values (empty fields)
    const submitButton = screen.getByText("ADD EMPLOYEE ACCOUNT");
    fireEvent.click(submitButton);

    // Check that error messages for username and password are present
    expect(screen.getByText("Please enter a username")).toBeInTheDocument();
    expect(screen.getByText("Please enter a password")).toBeInTheDocument();
  });

  it("displays error message if employee password not provided", () => {
    render(
      <BrowserRouter>
        <AddEmployee />
      </BrowserRouter>
    );

    // Enter a username
    const usernameInput = screen.getByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    // Submit with username entered but no password
    const submitButton = screen.getByText("ADD EMPLOYEE ACCOUNT");
    fireEvent.click(submitButton);

    // Check that password error message renders
    expect(screen.getByText("Please enter a password")).toBeInTheDocument();
  });
    
    it("should successfully add new employee if all information is provided", async () => {
      // Mock successful response from the server
      axios.post.mockResolvedValueOnce({ data: {} });

      const { getByLabelText, getByText } = render(
        <BrowserRouter>
          <AddEmployee />
        </BrowserRouter>
      );

      // Fill out the form and submit it
      fireEvent.change(getByLabelText("Username"), {
        target: { value: "testuser" },
      });
      fireEvent.change(getByLabelText("Password"), {
        target: { value: "testpassword" },
      });
      fireEvent.change(getByLabelText("Role"), {
        target: { value: "false" },
      });
      fireEvent.click(getByText("ADD EMPLOYEE ACCOUNT"));

      // Wait for the server response and check that post req is made with correct information
      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith("/users", {
          username: "testuser",
          password: "testpassword",
          isAdmin: false,
        });
      });
    });
});
