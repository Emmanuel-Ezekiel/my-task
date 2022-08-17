import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login/Login.jsx";
import Dashboard from "./component/Dashboard/Dashboard.jsx";


function App() {

 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
