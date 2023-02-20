import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useGlobalContext } from '../utils/globalStateContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

    // Set initial user states
    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    // Set initial values for errors
    const [errorMessage, setErrorMessage] = useState({
        username: null,
        password: null,
        apiError: null,
    })

  
  // access dispatch method to be able to update states in global context
  const { store, dispatch } = useGlobalContext()

  // Sign in user on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user); // for testing. remove when testing complete!

    let haveError = false;

    // Set error messages if username or password not provided
    if (!user.username) {
      setErrorMessage((prevErrorMessage) => {
        return {
          ...prevErrorMessage,
          username: "Please enter a username",
        };
      });
      haveError = true;
    }
    if (!user.password) {
      setErrorMessage((prevErrorMessage) => {
        return {
          ...prevErrorMessage,
          password: "Please enter a password",
        };
      });
      haveError = true;
    }

    if (!haveError) {
      setErrorMessage({
        username: null,
        password: null,
        apiError: null,
      });

      // Send user post request to log in
      axios
        .post("/users/login/admin", user)
        .then((res) => res.data)
        .then((json) => {
          // set JWT token value in global state
          dispatch({
            type: "setToken",
            data: json.token,
          });
          // set username value in global state
          dispatch({
            type: "setLoggedInUserName",
            data: user.username
          })
          // set user role to admin in global state
          dispatch({
            type: "setUserRole",
            data: "admin" // data: user.isAdmin ? "admin" : "employee",
          });
          console.log(json);
          navigate("/dashboard")
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.status === 401 &&
            error.response.data &&
            error.response.data.message ===
              "You are not authorized to access this endpoint"
          ) {
            // If the user is not an admin, make a request to the regular login endpoint
            axios
              .post("/users/login", user)
              .then((res) => res.data)
              .then((json) => {
                // set JWT token value in global state
                dispatch({
                  type: "setToken",
                  data: json.token,
                });
                // set username value in global state
                dispatch({
                  type: "setLoggedInUserName",
                  data: user.username,
                });
                // set user role to employee in global state
                dispatch({
                  type: "setUserRole",
                  data: "employee"
                });
                navigate("/dashboard");
                console.log(json);
              })
              .catch(() => {
                setErrorMessage((prevErrorMessage) => {
                  return {
                    ...prevErrorMessage,
                    apiError: "Invalid username or password",
                  };
                });
              });
          } else {
            setErrorMessage((prevErrorMessage) => {
              return {
                ...prevErrorMessage,
                apiError: "Invalid username or password",
              };
            });
          }
        });
    }
  };

  

    const handleChange = (e) => {
        setUser((prevUser) => {
            return {
                ...prevUser,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
      <>
        {store.token ? (
          <h3>Login Successful!</h3>
        ) : (
          <div>
            <h1>Employee Login</h1>
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={user.username}
                  placeholder="Enter Your Username"
                  onChange={handleChange}
                ></Form.Control>
                {errorMessage.username}
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={user.password}
                  placeholder="Enter Your Password"
                  onChange={handleChange}
                ></Form.Control>
                {errorMessage.password}
              </Form.Group>
              {errorMessage.apiError}
              <Button
                variant="outline-success"
                type="submit"
                onClick={handleSubmit}
              >
                LOG IN
              </Button>
            </Form>
          </div>
        )}
      </>
    );
}

export default Login