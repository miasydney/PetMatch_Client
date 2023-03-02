import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { GlobalContext } from "../../utils/globalStateContext";
import Dashboard from "./Dashboard";
import getCurrentDate from "../../utils/dateUtils";

// mock dependencies
jest.mock("axios");

const animals = [
  {
    _id: "1",
    name: "Fluffy",
    age: 2,
        notes: "Friendly and loves to play",
    _createdAt: 1,
    photo: { filename: "fluffy.jpg" },
  },
  {
    _id: "2",
    name: "Max",
    age: 4,
      notes: "Laid back and enjoys napping",
    _createdAt: 2,
    photo: { filename: "max.jpg" },
  },
];

// set store values with test username
const store = {
  loggedInUserName: "testusername",
  token: "testtoken",
  userRole: "admin",
};

describe("Dashboard", () => {
    beforeEach(() => {
    // mock API returning animals list
    axios.get.mockResolvedValueOnce({ data: animals });
    render(
      <GlobalContext.Provider value={{ store }}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </GlobalContext.Provider>
    );
  });

  it("renders the dashboard heading", () => {
    const heading = screen.getByText(/dashboard/i);
    expect(heading).toBeInTheDocument();
  });

  it("displays the user's name", () => {
    const name = screen.getByText(/currently signed in as/i);
    expect(name).toHaveTextContent("testusername");
  });

  it("displays the current date", () => {
     const currentDate = getCurrentDate();
     const currentDateElement = screen.getByText(currentDate);
     expect(currentDateElement).toBeInTheDocument();
  });

  it("renders quick links", () => {
      
        // find and render each of the required dashboard quick links
        const allAnimalsLink = screen.getByText("View all animals");
        expect(allAnimalsLink).toBeInTheDocument();

        const addAnimalLink = screen.getByText("Add new animal");
        expect(addAnimalLink).toBeInTheDocument();

        const manageEmployeesLink = screen.getByText(
          /Manage All Employee accounts/i
        );
        expect(manageEmployeesLink).toBeInTheDocument();
        
        const addEmployeesLink = screen.getByText(
          /Add New Employee account/i
        );
        expect(addEmployeesLink).toBeInTheDocument();
  });

  it("displays the longest residents heading", () => {
    const heading = screen.getByText(/longest residents/i);
    expect(heading).toBeInTheDocument();
  });

  it("displays a message when there are no animals", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    render(
      <GlobalContext.Provider value={{ store }}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </GlobalContext.Provider>
    );
    const message = await waitFor(() => screen.getByText(/no animals found/i));
    expect(message).toBeInTheDocument();
  });

    it("displays longest residents section", () => {
        const longestResidents = screen.getByText("Longest residents");
        expect(longestResidents).toBeInTheDocument();

        const longestResidentsInfo = screen.getByText(/These animals have been with you/i);
        expect(longestResidentsInfo).toBeInTheDocument();
  });
});
