import { Suspense, lazy, useEffect } from "react";
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
  const isAccessTokenExpired = async () => {
    if (tokenUtil.isAccessTokenExpired()) {
      await authBiz.refreshToken();
    }
  };

  useEffect(async () => {
    isAccessTokenExpired();
  }, []);

  return (
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
  );
};

export default App;
