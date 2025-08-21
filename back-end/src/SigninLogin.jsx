import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthentication } from "./AuthContext";
import MarathonAnimation from "./assets/animations/Marathon.json";
import Lottie from "lottie-react";
import "./SigninLogin.css";

const Animation = () => (
  <div className="animation-wrapper">
    <Lottie animationData={MarathonAnimation} loop={false} />
  </div>
);

const SigninLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, signup, isAuthenticated, loading } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 4500);
    const hideTimer = setTimeout(() => setShowAnimation(false), 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!loading && isAuthenticated) {
    // return <Navigate to="/home" />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        if (!formData.email || !formData.password) {
          setError("Please fill in all fields");
          setIsLoading(false);
          return;
        }

        const result = await login(formData.email, formData.password);

        if (result.success) {
          navigate("/home", { replace: true });
        } else {
          setError(result.error);
        }
      } else {
        if (
          !formData.email ||
          !formData.password ||
          !formData.firstName ||
          !formData.lastName
        ) {
          setError("Please fill in all fields");
          setIsLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters long");
          setIsLoading(false);
          return;
        }

        const result = await signup({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });

        if (result.success) {
          setIsLogin(true);
          setFormData({
            email: formData.email,
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
          });
          setError("Signup successful! Please log in.");
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    });
    setError("");
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
    setError("Social login not implemented yet");
  };

  return (
    <>
      {showAnimation && (
        <div className={`animation-overlay ${fadeOut ? "fade-out" : ""}`}>
          <Animation />
        </div>
      )}
      {!showAnimation && (
        <div className="auth-container">
          <div className="auth-wrapper">
            <div className="auth-card">
              <div className="auth-header">
                <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
                <p>
                  {isLogin
                    ? "Sign in to your account"
                    : "Sign up for a new account"}
                </p>
              </div>

              {error && <div className="error-message">{error}</div>}

              <form onSubmit={handleSubmit} className="auth-form">
                {!isLogin && (
                  <div className="name-row">
                    <div className="input-group">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        required
                        className="auth-input"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        required
                        className="auth-input"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                )}

                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    required
                    className="auth-input"
                    disabled={isLoading}
                  />
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                    className="auth-input"
                    disabled={isLoading}
                  />
                </div>

                {!isLogin && (
                  <div className="input-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                      required
                      className="auth-input"
                      disabled={isLoading}
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="forgot-password">
                    <a href="#" className="forgot-link">
                      Forgot your password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  className="auth-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-text">
                      <span className="loading-spinner-small"></span>
                      {isLogin ? "Signing In..." : "Signing Up..."}
                    </span>
                  ) : isLogin ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>

              <div className="auth-divider">
                <span>or</span>
              </div>

              <div className="social-login">
                <button
                  type="button"
                  className="social-button google"
                  onClick={() => handleSocialLogin("Google")}
                  disabled={isLoading}
                >
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="social-button github"
                  onClick={() => handleSocialLogin("GitHub")}
                  disabled={isLoading}
                >
                  Continue with GitHub
                </button>
              </div>

              <div className="auth-footer">
                <p>
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="toggle-button"
                    disabled={isLoading}
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SigninLogin;
