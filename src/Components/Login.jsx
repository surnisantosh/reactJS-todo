import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";

function mapAuthError(code) {
  if (!code) return "Authentication error";
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email format.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    default:
      return code;
  }
}

function Login() {
  //useState is a React Hook that allows you to add state to functional components.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  //useEffect is used to perform a side effect after the component renders.
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      navigate("/todo");
    } catch (error) {
      console.error("Login Error:", error);
      setMessage(mapAuthError(error.code) || error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="auth-card-wrapper">
        <form className="auth-card" onSubmit={handleLogin}>
          <div className="header">
            <h2>Login</h2>
            <button
              type="button"
              className="dark-toggle-btn"
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
      {message && (
        <div className="alert-modal">
          <div className="alert-content">
            <p>{message}</p>
            <button onClick={() => setMessage("")}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;