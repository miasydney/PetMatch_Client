import { useEffect, useReducer } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import globalReducer from "./reducers/globalReducer";
import { GlobalContext } from "./utils/globalStateContext";
import NavBar from "./components/NavBar";
import { Outlet, Route } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import NotFound from "./components/NotFound";
import AddAnimal from "./components/AddAnimal";
import AnimalList from "./components/AnimalList";
import Employees from "./components/Employees";
import AddEmployee from "./components/AddEmployee";
import Footer from "./components/Footer/Footer";

function App() {
  // set initial app states
  const initialState = {
    loggedInUserName: "",
    token: "",
    userRole: "",
  };
  const [store, dispatch] = useReducer(globalReducer, initialState);

  // Maintain logged in status after browser refresh
  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    if (username && token && userRole) {
      dispatch({
        type: "setLoggedInUserName",
        data: username,
      });
      dispatch({
        type: "setToken",
        data: token,
      });
      dispatch({
        type: "setUserRole",
        data: userRole,
      });
    }
  }, []);

  // create router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={store.token ? <MainPage /> : <Login />}
        errorElement={<NotFound />}
      >
        <Route path="add-animal" element={<AddAnimal />} />
        <Route path="/animals" element={<AnimalList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Route>
    )
  );

  // Main page component
  function MainPage() {
    return (
      <>
        <NavBar />
        <Outlet />
        <Footer />
      </>
    );
  }

  return (
    <div className="App">
      <GlobalContext.Provider value={{ store, dispatch }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
