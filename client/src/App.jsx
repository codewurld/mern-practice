import "./App.css"
import { useState, useEffect } from "react";
import Axios from 'axios';
import e from "cors";

function App() {

  // set initial states
  const [countryName, setCountryName] = useState("");
  const [timesVisited, setTimesVisited] = useState(0);
  const [countryList, setCountryList] = useState([])

  // display data on the front end once whenever page is rendered
  useEffect(() => {
    Axios.get("http://localhost:8089/display").then((response) => {
      setCountryList(response.data)
    })
  }, [])

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

      <hr />

      {/* display countryList */}
      <h1>Country List</h1>

      {countryList.map((val, key) => {
        return (

          <div key={key}>
            <ul>
              <li>{val.countryName}</li>
              <li>{val.timesVisited}</li>
            </ul>
          </div>

        )
      })}

    </div>
  );
}

export default App;
