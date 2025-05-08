import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./routing/protectedRoute";
import "./App.css";
import authUtil from "./utilities/authUtil";
import authBiz from "./businesses/authBiz";

const LoginPage = lazy(() => import("./pages/loginPage"));
const RegistrationPage = lazy(() => import("./pages/registrationPage"));
const NotFoundPage = lazy(() => import("./pages/notFoundPage"));
const TicTacToePage = lazy(() => import("./pages/ticTacToePage"));

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // if (authUtil.isAccessTokenExpired()) {
    // }

    // if (authUtil.isRefreshTokenExpired()) {

    authUtil.isRefreshTokenExpired();

    // console.log("Refresh token expired, logging out...");
    // localStorage.removeItem("accessToken");
    // Optionally clear cookies (if not HttpOnly)
    // document.cookie = "jwt=; Max-Age=0; path=/;";
    // navigate("");
    // }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/ticTacToe"
          element={
            <ProtectedRoute>
              <TicTacToePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
