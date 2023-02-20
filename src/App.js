import { useReducer } from 'react';
import { Navbar } from 'react-bootstrap';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import globalReducer from './reducers/globalReducer';
import { GlobalContext } from './utils/globalStateContext';

function App() {

  const initialState = {
    loggedInUserName: "",
    token: "",
    userRole: "",
  }

  const [store, dispatch] = useReducer(globalReducer, initialState)

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
