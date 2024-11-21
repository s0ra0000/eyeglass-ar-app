// contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Platform } from "react-native";
const isWeb = Platform.OS === "web";
interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      let token;
      if (isWeb) {
        token = localStorage.getItem("token"); // Use LocalStorage for web
      } else {
        token = await SecureStore.getItemAsync("token");
      }

      setIsAuthenticated(!!token);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
