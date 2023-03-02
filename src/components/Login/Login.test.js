import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { GlobalContext } from "../../utils/globalStateContext";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

jest.mock("axios");

describe("Login component", () => {
  it("should render the form correctly", () => {

    // Render Login form with intial global context store and dispatch values set
    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <GlobalContext.Provider value={{ store: {}, dispatch: jest.fn() }}>
          <Login />
        </GlobalContext.Provider>
      </BrowserRouter>
    );

    // Check username label and form field render
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter Your Username")).toBeInTheDocument();

    // Check password label and form field render
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter Your Password")).toBeInTheDocument();
    expect(getByText("LOG IN")).toBeInTheDocument();
  });

  it("should display an error message if no username is provided", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <GlobalContext.Provider value={{ store: {}, dispatch: jest.fn() }}>
          <Login />
        </GlobalContext.Provider>
      </BrowserRouter>
    );

    // Simulate user log in with no username entered
    fireEvent.click(getByText("LOG IN"));

    // Check that username error shows in the document
    await waitFor(() => {
      expect(getByText("Please enter a username")).toBeInTheDocument();
    });
  });

  it("should display an error message if no password is provided", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <GlobalContext.Provider value={{ store: {}, dispatch: jest.fn() }}>
          <Login />
        </GlobalContext.Provider>
      </BrowserRouter>
    );

    // Enter username
    fireEvent.change(getByLabelText("Username"), {
      target: { value: "testuser" },
    });

    // Submit log in form with username value but no password
    fireEvent.click(getByText("LOG IN"));

    // Check that password error shows
    await waitFor(() => {
      expect(getByText("Please enter a password")).toBeInTheDocument();
    });
  });

  it("should display an error message if the API returns an error", async () => {
    // mock 401 status return from axios as user has not entered valid credentials
    axios.post.mockRejectedValueOnce({
      response: {
        status: 401,
        data: { message: "Invalid username or password" },
      },
    });

    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <GlobalContext.Provider value={{ store: {}, dispatch: jest.fn() }}>
          <Login />
        </GlobalContext.Provider>
      </BrowserRouter>
    );

    // Enter username field
    fireEvent.change(getByLabelText("Username"), {
      target: { value: "testuser" },
    });

    // Enter password field
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "testpassword" },
    });

    // Simulate form submission with invalid username and password
    fireEvent.click(getByText("LOG IN"));

    // Check that Invalid username or password error renders
    await waitFor(() => {
      expect(getByText("Invalid username or password")).toBeInTheDocument();
    });
  });

  it("should redirect to the dashboard if the login is successful", async () => {
    // mock getting token response so user is authorised to log in
    axios.post.mockResolvedValueOnce({ data: { token: "testtoken" } });

    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <GlobalContext.Provider value={{ store: {}, dispatch: jest.fn() }}>
          <Login />
        </GlobalContext.Provider>
      </BrowserRouter>
    );

    // Enter username and password values
    fireEvent.change(getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "testpassword" },
    });

    // Simulate form submit
    fireEvent.click(getByText("LOG IN"));

    // Check that successfully reroutes to the dashboard link after login 
    await waitFor(() => {
      expect(window.location.href).toContain("/dashboard");
    });
  });
});

