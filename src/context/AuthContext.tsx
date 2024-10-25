"use client";
import useStorage from "@/hook/useStorage";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useState, ReactNode, useEffect } from "react";

type User = {
  email: string;
  fullName: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const storage = useStorage();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkToken();
  }, []);
  const checkToken = () => {
    const token = storage.getItem("token");
    if (token) {
      setUser({
        email: "your@email.com",
        fullName: "John D. Smith",
      });
      if (pathname === "/login") {
        router.replace("/dashboard");
      }
    } else {
      logout();
    }
  };

  const login = (email: string, password: string) => {
    storage.setItem("token", "access-token");
    setUser({
      email: "your@email.com",
      fullName: "John D. Smith",
    });
    router.replace("/dashboard");
  };

  const logout = () => {
    setUser(null);
    storage.clear();
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
