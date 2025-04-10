/*
-------------------------------------------------------------------------------
Program:    App.js
Author:     Justin Clark
Date:       03/07/2025
Language:   javascript
Purpose:    inject dom root element and routing
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JC  03.07.2025     Created initialization code
-------------------------------------------------------------------------------
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/pages/layout";
import Home from "./components/pages/home";
import Prices from "./components/pages/prices";
import NoPage from "./components/pages/nopage";
import Login from "./components/pages/login";

import './App.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            {/* <Route path="prices" element={user ? <Prices /> : <NoPage />} /> */}

            {/* Presentation view, DO NOT leave in production: */}
            <Route path="prices" element={<Prices />} />
            <Route path="login" element={<Login />} />

            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const Root = () => {
  return (
    <App />
  )
}

export default Root;
