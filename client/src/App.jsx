import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import HelpBot from "./component/HelpBot/HelpBot";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import Tasks from "./pages/Tasks/Tasks";
import Attendance from "./pages/Attendance/Attendance";

export default function App() {
    return (
        <>
          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            <Route
              path="/profile"
              element= {
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
                path="/tasks"
                element={
                    <ProtectedRoute>
                        <Tasks />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/attendance"
                element={
                    <ProtectedRoute>
                        <Attendance />
                    </ProtectedRoute>
                }
            />

          </Routes>

          <HelpBot />
        </>
    );
}