// styles
// import '../styles/HomePage.css';

import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <p> Home Page</p>
      <button
        onClick={() => {
          navigate("/event")
        }}
      > I'm an event! Click me!</button>
    </>
  )
}

export default HomePage
