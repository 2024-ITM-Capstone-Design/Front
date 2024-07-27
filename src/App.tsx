import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Intro from "./pages/Intro";
import CreateLayout from "./components/CreateLayout";
import FileUpload from "./pages/FileUpload";
import ServiceSelection from "./pages/ServiceSelection";
import AnalysisResults from "./pages/AnalysisResults";
import CheckResult from "./pages/CheckResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />

        <Route path="/intro" element={<Intro />} />

        <Route path="/create/file-upload" element={<FileUpload />} />
        <Route
          path="/create/service-selection"
          element={<ServiceSelection />}
        />
        <Route path="/create/analysis-result" element={<AnalysisResults />} />
        <Route path="/create/check-result" element={<CheckResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
