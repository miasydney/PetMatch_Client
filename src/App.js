import { useEffect, useReducer } from 'react';
import { Navbar } from 'react-bootstrap';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import globalReducer from './reducers/globalReducer';
import { GlobalContext } from './utils/globalStateContext';

function App() {

  // set initial app states
  const initialState = {
    loggedInUserName: "",
    token: "",
    userRole: "",
  }
  const [store, dispatch] = useReducer(globalReducer, initialState)

  // Maintain logged in status after browser refresh
  useEffect(() => {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('userRole')
    if (username && token && userRole) {
      dispatch({
        type: 'setLoggedInUserName',
        data: username
      })
      dispatch({
        type: "setToken",
        data: token
      });
      dispatch({
        type: "setUserRole",
        data: userRole
      });
    }
  }, [])

  return (
    <div className="App">
      <GlobalContext.Provider value={{ store, dispatch }}>
        <h1>Home page</h1>
        <Login />
        <Dashboard />
        <Navbar />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
