"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  userId: number | null;
  login: (id: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");

    if (token && savedUserId) {
      setIsAuthenticated(true);
      setUserId(Number(savedUserId));
    }
  }, []);

  const login = (id: number) => {
    const token = Math.random() * 1000;
    localStorage.setItem("token", token.toString());
    localStorage.setItem("userId", id.toString());
    setIsAuthenticated(true);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
