import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

import Create from "./pages/Create";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className=" min-h-[100vh] w-full bg-[url('https://i.pinimg.com/236x/05/b4/fb/05b4fbc3f169175e6deb97b3977175b6.jpg')]">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/update/:id" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
