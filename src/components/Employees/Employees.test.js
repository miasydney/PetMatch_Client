import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import Employees from "./Employees";

jest.mock("axios");

describe("Employees component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display a list of employees", async () => {
    const employees = [
      { id: 1, username: "user1", isAdmin: true },
      { id: 2, username: "user2", isAdmin: false },
    ];
    axios.get.mockResolvedValueOnce({ data: employees });

    render(
      <BrowserRouter>
        <Employees />
      </BrowserRouter>
    );

    expect(screen.getByText("Manage Employees")).toBeInTheDocument();
    expect(screen.getByText("All Employees")).toBeInTheDocument();

    // Check that correct employees and roles render after they are fetched
      await waitFor(() => {
      expect(screen.getByText("user1")).toBeInTheDocument();
      expect(screen.getByText("Admin")).toBeInTheDocument();
      expect(screen.getByText("user2")).toBeInTheDocument();
      expect(screen.getByText("Employee")).toBeInTheDocument();
    });
  });

    it("should allow editing an employee", async () => {
    const employees = [{ id: 1, username: "user1", isAdmin: true }];
    axios.get.mockResolvedValueOnce({ data: employees });
    axios.patch.mockResolvedValueOnce({});

    render(
      <BrowserRouter>
        <Employees/>
      </BrowserRouter>
    );

    // Ensure user to edit is in document
    await waitFor(() => {
      expect(screen.getByText("user1")).toBeInTheDocument();
    });

    // Simulate user clicks edit button
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    // Simulate user edit
    const usernameInput = screen.getByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "newUser1" } });

    // Simulate user clicking save changes after edit
    const saveChangesButton = screen.getByText("Save Changes");
    fireEvent.click(saveChangesButton);

    // Check patch request was made
    expect(axios.patch).toHaveBeenCalled();
  });

  it("should allow deleting an employee", async () => {
    const employees = [{ id: 1, username: "user1", isAdmin: true }];
    axios.get.mockResolvedValueOnce({ data: employees });
    axios.delete.mockResolvedValueOnce({});

    render(
      <BrowserRouter>
        <Employees />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("user1")).toBeInTheDocument();
    });

    // User requests to delete employee  
    const deleteButton = screen.getByText("Delete Account")
    fireEvent.click(deleteButton);

    // check delete request was made after edits
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalled()
    });
  });

  it("should display a message when there are no employees", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <BrowserRouter>
        <Employees />
      </BrowserRouter>
    );

    // Check that correct message shows when no data is returned from get request
    await waitFor(() => {
      expect(
        screen.getByText("There are currently no employee accounts to display.")
      ).toBeInTheDocument();
    });
  });
});
