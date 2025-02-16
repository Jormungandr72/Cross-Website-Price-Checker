import React, { useState, useEffect } from "react";
import axios from "axios";

import './App.css'

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/test/")
      .then(response => setMessage(response.data.message))
      .catch(error => setMessage("Error fetching data"));
  }, []);

  return (
    <div class="navbar">
      <ul>
        <li><a>Home</a></li>
        <li><a>Trends</a></li>
        <li><a>My Prices</a></li>
        <li style={{ float: 'right' }}><a>☰</a></li>
      </ul>

      <p>{message}</p>
    </div>
  );
}

export default App;