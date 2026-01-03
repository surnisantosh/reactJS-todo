import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";

function mapAuthError(code) {
  if (!code) return "Signup error";
  switch (code) {
    case "auth/email-already-in-use":
      return "That email is already registered.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    default:
      return code;
  }
}

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    try {
      setLoading(true);
      await signup(email, password);
      navigate("/todo");
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage(mapAuthError(error.code) || error.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="auth-card-wrapper">
        <form className="auth-card" onSubmit={handleSignup}>
          <div className="header">
            <h2>Sign Up</h2>
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
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Creating..." : "Create Account"}
          </button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
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

export default Signup;