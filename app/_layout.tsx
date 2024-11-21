// app/_layout.tsx
import React, { useContext, useEffect } from "react";
import { Stack, usePathname, useRouter } from "expo-router";
import { AuthProvider, AuthContext } from "../contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

const MainLayout = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname
  useEffect(() => {
    if (!isLoading) {
      console.log(isLoading);
      if (!isAuthenticated && pathname.startsWith("/")) {
        console.log(isAuthenticated);
        router.replace("/auth/login");
      }
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};
