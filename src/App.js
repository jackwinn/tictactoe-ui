import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routing/protectedRoute";

// Lazy-load the LoginPage component
const LoginPage = lazy(() => import("./pages/loginPage"));
const NotFoundPage = lazy(() => import("./pages/notFoundPage"));
const TicTacToePage = lazy(() => import("./pages/ticTacToePage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
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
    </BrowserRouter>
  );
}

export default App;
