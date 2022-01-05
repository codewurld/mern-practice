import "./App.css"
import { useState, useEffect } from "react";
import Axios from 'axios';
import e from "cors";

function App() {

  // set initial states
  const [countryName, setCountryName] = useState("");
  const [timesVisited, setTimesVisited] = useState(0);
  const [newCountryName, setNewCountryName] = useState("");
  const [countryList, setCountryList] = useState([])

  // display data with list of all countries on the front end once whenever page is rendered
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

  // function to update entry on click
  // update to happen depending on value of id called
  const handleUpdateCountryClick = (id) => {
    Axios.put("http://localhost:8089/update", {
      id: id,
      newCountryName: newCountryName
    })

  }

  // function to delete item based on id
  const handleDeleteCountryClick = (id) => {
    Axios.delete(`http://localhost:8089/delete/${id}`, {

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

          <div key={key} className="lists">

            <h2>Country Name: {val.countryName}</h2>
            <p>Times Visited: {val.timesVisited}</p>
            <input type="text" placeholder="new country name" onChange={(e) => {
              e.preventDefault();
              setNewCountryName(e.target.value)
            }} />
            {/* get _id as stored in DB from value in countryList */}
            <button onClick={() => handleUpdateCountryClick(val._id)}>UPDATE</button>
            <button onClick={() => handleDeleteCountryClick(val._id)}>DELETE</button>
          </div>

        )
      })}

    </div>
  );
}

export default App;
