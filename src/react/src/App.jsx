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
            <Route path="prices" element={<Prices />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;