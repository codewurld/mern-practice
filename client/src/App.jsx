import "./App.css"
import { useState } from "react";
import Axios from 'axios';

function App() {

  // set initial states
  const [countryName, setCountryName] = useState("");
  const [timesVisited, setTimesVisited] = useState(0);

  // connect with backend
  // onClick - fulfil http request
  // localhost URL must be the same as specified in route on serverSide
  // specify object being sent represented by current state
  const handleClickAddToList = () => {
    Axios.post("http://localhost:8089/addvisit", {
      countryName: countryName,
      timesVisited: timesVisited
    })
  }

  return (
    <div className="App">
      <h1>CRUD App Practice</h1>

      <label>Country Name</label>
      {/* change states to input value */}
      <input type="text" onChange={(e) => {
        setCountryName(e.target.value)
      }} />

      <label>Times Visited</label>
      <input type="number" onChange={(e) => {
        setTimesVisited(e.target.value)
      }} />
      <button onClick={handleClickAddToList}>Add to Country List</button>
    </div>
  );
}

export default App;
