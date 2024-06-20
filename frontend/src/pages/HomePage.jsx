import React from 'react';
import { useNavigate } from 'react-router-dom';

import NewEvent from '../components/NewEvent'
function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <p>Home Page</p>
      <button
        onClick={() => {
          navigate("/event");
        }}
      >
        Go to Event Page
      </button>
      <NewEvent />
    </>
  );
}

export default HomePage;
