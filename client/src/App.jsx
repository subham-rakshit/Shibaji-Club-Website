import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Home,
  About,
  Practices,
  Blogs,
  Contact,
  Login,
  Register,
  Dashboard,
} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/practices" element={<Practices />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
