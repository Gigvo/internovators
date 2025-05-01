"use client";
// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { api } from "@/lib/api";
import type { AxiosError } from "axios";

// 1. Define exactly what your “User” shape is
export interface User {
  id: string;
  name: string;
  email: string;
  // add any other fields you return from GET /users/profile
}

// 2. Context-value interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // GET /users/profile → typed User
  const fetchUser = async (): Promise<void> => {
    try {
      const response = await api.get<User>("/users/profile");
      setUser(response.data);
    } catch (err) {
      if (err instanceof Error && (err as AxiosError).isAxiosError) {
        const axiosError = err as AxiosError;
        // If the token is bad, clear it
        if (axiosError.response?.status === 401) {
          localStorage.removeItem("token");
        }
      }
      setUser(null);
    }
  };

  // Store token and then load current user
  const login = async (token: string): Promise<void> => {
    localStorage.setItem("token", token);
    setLoading(true);
    await fetchUser();
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
