import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";

import Intro from "./pages/Intro";
import FileUpload from "./pages/FileUpload";
import ServiceSelection from "./pages/ServiceSelection";
import AnalysisResults from "./pages/AnalysisResults";
import CheckResult from "./pages/CheckResult";
import CheckLyric from "./pages/CheckLyric";
import OAuth from "./pages/OAuth";
import MyPage from "./pages/MyPage";
import { useAuthStore } from "./store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function App() {
  const { isLoggedIn } = useAuthStore();

  //로그인한 회원은 들어갈 수 없는 페이지
  const PublicRoute = () => {
    return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
  };

  //로그인한 회원만 들어갈 수 있는 페이지
  const PrivateRoute = () => {
    return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/intro" element={<Intro />} />

          <Route element={<PublicRoute />}>
            <Route path="/redirect" element={<OAuth />} />
          </Route>

          {/* <Route element={<PrivateRoute />}> */}
          <Route path="/create/file-upload" element={<FileUpload />} />
          <Route
            path="/create/service-selection"
            element={<ServiceSelection />}
          />
          <Route path="/create/check-lyric/:itemId" element={<CheckLyric />} />
          <Route
            path="/create/analysis-result/:itemId"
            element={<AnalysisResults />}
          />
          <Route
            path="/create/check-result/:itemId"
            element={<CheckResult />}
          />
          <Route path="/my-page" element={<MyPage />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
