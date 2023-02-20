import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

const Login = () => {

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

    const [userFetched, setUserFetched] = useState(false)

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
          setUserFetched(true);
          localStorage.setItem("token", json.token); // store token in local storage
          console.log(json);
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
                setUserFetched(true);
                localStorage.setItem("token", json.token); // store token in local storage
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
        {userFetched ? (
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