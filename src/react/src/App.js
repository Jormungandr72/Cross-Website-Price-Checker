// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Layout from "./components/pages/layout";
import Home from "./components/pages/home";
import Trends from "./components/pages/trends";
import Prices from "./components/pages/prices";
import NoPage from "./components/pages/nopage";
import Login from "./components/pages/login"

import GoogleLoginButton from "./components/molecules/google_login_button";

import React, { useState, useEffect } from "react";

import supabase from "./components/molecules/supabaseClient";

import axios from "axios";

import './App.css';

const App = () => {

  // If app takes longer to load, show loading...
  // Note: loading is never showed, it's only stored in message...
  // setMessage is still required therefore so is message
  const [message, setMessage] = useState("Loading...");
  
  // Track user authentication state
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/test/")
      .then(response => setMessage(response.data.message))
      .catch(error => setMessage("Error fetching data at \"http://127.0.0.1:8000/api/test/\""));

      // Get session info
      const fetchSession = async () => {
        const {
            data: { session },
          } = await supabase.auth.getSession();
          setUser(session?.user || null);
        };
      
      fetchSession();

      // Subscribe to auth state change
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });
  }, []);

  // clear userstate and redirect to home
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/')
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="trends" element={<Trends />} />
          <Route path="prices" element={user ? <Prices /> : <NoPage />} />
          
          <Route path="login" element={<Login />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>

      <h1>Login Screen</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      ) : (
        <GoogleLoginButton />
      )}
    </div>
  );
}

// The only reason this is wrapped in BrowserRouter is
// because of supabase, useNavigate requires it to be wrapped
const Root = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default Root;
