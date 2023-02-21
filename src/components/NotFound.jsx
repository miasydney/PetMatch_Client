import React from 'react'
import { FaDog } from 'react-icons/fa'

const NotFound = () => {
  return (
      <div>
        <FaDog />
        <h2>404 Error: Page Not Found</h2>
        <h3>Oops! The page you're looking for doesn't seem to exist.</h3>
        <h5>
            Here's a link to go back to your <a href="/dashboard">Dashboard</a>.
        </h5>
    </div>
  );
}

export default NotFound