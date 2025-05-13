import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routing/protectedRoute";
import "./App.css";
import tokenUtil from "./utilities/tokenUtil";
import authBiz from "./businesses/authBiz";

const LoginPage = lazy(() => import("./pages/loginPage"));
const RegistrationPage = lazy(() => import("./pages/registrationPage"));
const NotFoundPage = lazy(() => import("./pages/notFoundPage"));
const TicTacToePage = lazy(() => import("./pages/ticTacToePage"));

const App = () => {
  const isAccessTokenValid = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const isTokenExpired = tokenUtil.isAccessTokenExpired();

    if (accessToken && isTokenExpired) {
      const { refreshedToken } = await authBiz.refreshToken();
      if (refreshedToken) localStorage.setItem("accessToken", refreshedToken);
    }
  };

  useEffect(() => {
    isAccessTokenValid();
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
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
    </>
  );
};

export default App;
