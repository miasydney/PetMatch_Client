import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { GlobalContext } from "../../utils/globalStateContext";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

jest.mock("axios");

describe("Login component", () => {
  it("should render the form correctly", () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <GlobalContext.Provider value={{ store: {}, dispatch: jest.fn() }}>
          <Login />
        </GlobalContext.Provider>
      </BrowserRouter>
    );

    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter Your Username")).toBeInTheDocument();
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

    fireEvent.click(getByText("LOG IN"));

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

    fireEvent.change(getByLabelText("Username"), {
      target: { value: "testuser" },
    });

    fireEvent.click(getByText("LOG IN"));

    await waitFor(() => {
      expect(getByText("Please enter a password")).toBeInTheDocument();
    });
  });

  it("should display an error message if the API returns an error", async () => {
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

    fireEvent.change(getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "testpassword" },
    });

    fireEvent.click(getByText("LOG IN"));

    await waitFor(() => {
      expect(getByText("Invalid username or password")).toBeInTheDocument();
    });
  });

  it("should redirect to the dashboard if the login is successful", async () => {
    axios.post.mockResolvedValueOnce({ data: { token: "testtoken" } });

    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <GlobalContext.Provider value={{ store: {}, dispatch: jest.fn() }}>
          <Login />
        </GlobalContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "testpassword" },
    });

    fireEvent.click(getByText("LOG IN"));

    await waitFor(() => {
      expect(window.location.href).toContain("/dashboard");
    });
  });
});

