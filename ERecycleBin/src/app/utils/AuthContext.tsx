"use client";
import { message } from "antd";
import React, { ReactHTML, createContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: any;
  token: string | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});
export const useAuth = () => React.useContext(AuthContext);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  console.log(user);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      for (let key in Object.keys(user)) {
        localStorage.setItem(key, JSON.stringify(user[key]));
      }
    }
  }, [user]);
  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/user/validate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: localStorage.getItem("token") }),
          }
        );
        const data = await res.json();
        if (data) {
          setUser(data);
        }
        localStorage.setItem("user", JSON.stringify(data));
      } catch (err) {
        console.log(err);
        message.error("Invalid Token");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      }
    };
    if (localStorage.getItem("token")) {
      validateToken();
    }
  }, []);
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);
  return (
    <AuthContext.Provider value={{ user, token, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
