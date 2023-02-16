import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'

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

    // Check for errors and handle form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user)

        let haveError = false

        // Set error messages if username or password not provided
        if (!user.username) {
            setErrorMessage((prevErrorMessage) => {
                return {
                    ...prevErrorMessage,
                    username: "Please enter a username"
                }
            })
            haveError = true
        }
        if (!user.password) {
            setErrorMessage((prevErrorMessage) => {
                return {
                    ...prevErrorMessage,
                    password: "Please enter a password"
                }
            })
            haveError = true;
        }

        if (!haveError) {
          setErrorMessage({
            username: null,
            password: null,
            apiError: null,
          });

          console.log("user logged in");
          setUserFetched(true); // for testing purposes. Move to post request

          // Send user post request to log in

          // axios
          //     .post("/auth/login", user)
          //     .then((res) => res.data)
          // .then((json) => {
          //     setUserFetched(true)
          //     console.log(json)
          // })
          // .catch(() => {
          // setErrorMessage((prevErrorMessage) => {
          //     return {
          //         ...prevErrorMessage,
          //         apiError: "Invalid username or password"
          //         }
          //     })
          // })
        }

    }

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
      </>
    );
}

export default Login