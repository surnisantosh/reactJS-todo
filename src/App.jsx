// src/App.jsx
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import TodoApp from "./Components/TodoApp";
import { useEffect } from "react";
import "./App.css";

// Protect routes from unauthenticated access
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { replace: true });
    }
  }, [currentUser, navigate]);

  return currentUser ? children : null;
}

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route
        path="/todo"
        element={
          <ProtectedRoute>
            <TodoApp />
          </ProtectedRoute>
        }
      />

      {/* Root route */}
      <Route
        path="/"
        element={
          currentUser ? (
            <ProtectedRoute>
              <TodoApp />
            </ProtectedRoute>
          ) : (
            <Login />
          )
        }
      />
    </Routes>
  );
}

export default App;