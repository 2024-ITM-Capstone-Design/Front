import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Create from "./pages/Create";
import Intro from "./pages/Intro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/create" element={<Create />} />
        <Route path="/intro" element={<Intro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
