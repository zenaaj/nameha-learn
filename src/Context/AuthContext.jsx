import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const found = savedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      navigate("/dashboard");
      return true;
    }
    return false;
  };

  const register = (newUser) => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    savedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(savedUsers));

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

