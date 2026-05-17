import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { ProtectedRoute } from "./auth/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { LeadDetails } from "./pages/LeadDetails";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/leads/:id"
          element={
            <ProtectedRoute>
              <LeadDetails />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};