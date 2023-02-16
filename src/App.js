import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <h1>Home page</h1>
      <Login />
      <Dashboard />
    </div>
  );
}

export default App;
