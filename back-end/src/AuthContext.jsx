import { createContext, useState, useEffect, useContext } from "react";

// Create context
const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    const basicAuth = btoa(`${email}:${password}`);

    try {
      const res = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("auth_email", email);
        localStorage.setItem("auth_password", password);
        setToken(data.token);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: data?.message || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "Login error" };
    }
  };

  const signup = async ({ email, password, firstName, lastName }) => {
    try {
      const res = await fetch("http://localhost:3001/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("auth_email", email);
        localStorage.setItem("auth_password", password);
        setToken(data.token);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: data?.message || "Signup failed" };
      }
    } catch (error) {
      return { success: false, error: "Signup error" };
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_email");
    localStorage.removeItem("auth_password");
  };

  const getAuthHeaders = () => {
    const email = localStorage.getItem("auth_email");
    const password = localStorage.getItem("auth_password");

    if (!email || !password) return {};

    const basicAuth = btoa(`${email}:${password}`);
    return {
      Authorization: `Basic ${basicAuth}`,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        login,
        logout,
        signup,
        getAuthHeaders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easier access
export const useAuthentication = () => useContext(AuthContext);
