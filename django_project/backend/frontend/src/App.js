// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/test/")
      .then(response => setMessage(response.data.message))
      .catch(error => setMessage("Error fetching data"));
  }, []);

  return (
    <div>
      <h1>Test App</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;