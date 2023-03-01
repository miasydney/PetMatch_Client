import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { GlobalContext } from "../../utils/globalStateContext";
import axios from "axios";
import NavBar from "./NavBar";


describe("Navbar component", () => {
  test("navbar links render for admin", () => {
    let store = {};

    // set admin store values
    store = {
      loggedInUserName: "testusername",
      token: "testtoken",
      userRole: "admin",
    };

    // render login component with global context and router set up
    render(
      <GlobalContext.Provider value={{ store }}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </GlobalContext.Provider>
    );

    // check for dashboard link
    const dashboardText = screen.getByText(/Dashboard/i);
    expect(dashboardText).toBeInTheDocument();

    // check for view all animals link
    const viewAnimalsText = screen.getByText(/View All Animals/i);
    expect(viewAnimalsText).toBeInTheDocument();

    // check for manage employees link
    const manageEmployeesText = screen.getByText(/Manage Employees/i);
    expect(manageEmployeesText).toBeInTheDocument();

    // check correct username renders
    const loggedInUserName = screen.getByText(/testusername/i);
    expect(loggedInUserName).toBeInTheDocument();

    // check for logout button
    const logoutButton = screen.getByText(/LOG OUT/i);
    expect(logoutButton).toBeInTheDocument();
  });

  test("navbar links render do not render for employee", () => {
    let store = {};

    // set employee store values
    store = {
      loggedInUserName: "testusername",
      token: "testtoken",
      userRole: "employee",
    };

    // render login component with global context and router set up
    render(
      <GlobalContext.Provider value={{ store }}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </GlobalContext.Provider>
    );

    // check for dashboard link
    const dashboardText = screen.getByText(/Dashboard/i);
    expect(dashboardText).toBeInTheDocument();

    // check for view all animals link
    const viewAnimalsText = screen.getByText(/View All Animals/i);
    expect(viewAnimalsText).toBeInTheDocument();

    // ensure manage employees link doesn't display
    const manageEmployeesText = screen.queryByText(/Manage Employees/i);
    expect(manageEmployeesText).not.toBeInTheDocument();
  });

  test("clicking logout button clears store", () => {
    // set initial store and dispatch values
    const mockDispatch = jest.fn();
    const mockStore = {
      loggedInUserName: "testuser",
      token: "testtoken",
      userRole: "admin",
    };

    // render element to screen with store and dispatch accessible
    render(
      <GlobalContext.Provider
        value={{ store: mockStore, dispatch: mockDispatch }}
      >
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </GlobalContext.Provider>
    );

    // user click on log out button
    const logoutButton = screen.getByText(/LOG OUT/i);
    fireEvent.click(logoutButton);

    // test dispatch called and token set to null
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "setToken",
      data: null,
    });
    
    // test dispatch called and loggedInUserName set to null
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "setLoggedInUserName",
      data: null,
    });

    // test dispatch called and userRole set to null
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "setUserRole",
      data: null,
    });
  });
  })