import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Admin from "./pages/Admin";
import TutorDashboard from "./pages/TutorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Tutorials from "./pages/Tutorials";

import ProtectedRoute from "./components/ProtectedRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private pages */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/tutor-dashboard"
          element={
            <ProtectedRoute>
              <TutorDashboard />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/tutorials"
          element={
            <ProtectedRoute>
              <Tutorials />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
