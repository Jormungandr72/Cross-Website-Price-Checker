// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/layout";
import Home from "./pages/home";
import Trends from "./pages/trends";
import Prices from "./pages/prices";
import NoPage from "./pages/nopage";

import React, { useState, useEffect } from "react";
import axios from "axios";

import './App.css'

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/test/")
      .then(response => setMessage(response.data.message))
      .catch(error => setMessage("Error fetching data at \"http://127.0.0.1:8000/api/test/\""));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="trends" element={<Trends />} />
          <Route path="prices" element={<Prices />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
