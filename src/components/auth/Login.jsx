import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/login-image.png";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
      },1200);
    } else {
      setError("Email and Password are required");
    }
  };

  return (
    <div>
      <div className="login-card">
        <div
          className="login-left"
          style={{ backgroundImage: `url(${loginImage})` }}
        ></div>
        <div className="login-right">
          <h2>Employee Management System</h2>
          <p className="subtitle">Please enter your details to sign in.</p>

          <form onSubmit={handleSubmit}>
            {error && <p className="error-text">{error}</p>}

            <div style={{ textAlign: "left" }}>
              <label>
                <strong>Email Address</strong>
              </label>
              <input
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="password-header">
              <label>
                <strong>Password</strong>
              </label>
              <span>
                <Link to="/forgot-password">Forgot Password?</Link>
              </span>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="signin-btn">
              Sign In
            </button>
          </form>

          <div className="divider">OR CONTINUE WITH</div>

          <div className="social-buttons">
            <button className="social-btn" type="button">
              <FcGoogle size={20} />
              <span>Google</span>
            </button>

            <button className="social-btn" type="button">
              <FaApple size={20} />
              <span>Apple</span>
            </button>
          </div>

          <p className="signup-text">
            Don't have an account?{" "}
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
