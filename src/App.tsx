import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuthStore } from "./store/useAuthStore";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RootLayout from "./layout/RootLayout";

// Lazy-loaded components
const MainPage = lazy(() => import("./pages/Main"));
const ServiceSelectionPage = lazy(
  () => import("./pages/Create/ServiceSelection")
);

const FileUploadPage = lazy(() => import("./pages/Create/FileUpload"));
const CheckLyricPage = lazy(() => import("./pages/Create/CheckLyric"));
const OAuthPage = lazy(() => import("./pages/OAuth"));
const MyPage = lazy(() => import("./pages/MyPage"));
const AnalysisResultPage = lazy(() => import("./pages/Create/AnalysisResults"));
const GeneratePromptPage = lazy(() => import("./pages/Create/GeneratePrompt"));
const ViewResultPage = lazy(() => import("./pages/Create/ViewResult"));

function App() {
  // PrivateRoute: 로그인하지 않은 사용자는 접근 불가
  const PrivateRoute: React.FC = () => {
    const { isLoggedIn } = useAuthStore();
    return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "redirect",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <OAuthPage />
            </Suspense>
          ),
        },
        {
          path: "my-page",
          element: <PrivateRoute />,
          children: [
            {
              path: "",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <MyPage />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "create",
          element: <PrivateRoute />,
          children: [
            {
              path: "service-selection",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <ServiceSelectionPage />
                </Suspense>
              ),
            },
            {
              path: "file-upload",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <FileUploadPage />
                </Suspense>
              ),
            },
            {
              path: "check-lyric/:itemId",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <CheckLyricPage />
                </Suspense>
              ),
            },
            {
              path: "analysis-result/:itemId",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <AnalysisResultPage />
                </Suspense>
              ),
            },
            {
              path: "generate-prompt/:itemId",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <GeneratePromptPage />
                </Suspense>
              ),
            },
            {
              path: "view-result/:itemId",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <ViewResultPage />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
