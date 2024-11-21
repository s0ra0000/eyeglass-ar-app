// app/auth/login.tsx
import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  Platform,
} from "react-native";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { AuthContext } from "../../../contexts/AuthContext";
const isWeb = Platform.OS === "web";
const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://eyeglass-ar-backend-one.vercel.app/auth/login",
        {
          email,
          password,
        }
      );
      if (isWeb) {
        localStorage.setItem("token", response.data.token); // Use LocalStorage for web
      } else {
        await SecureStore.setItemAsync("token", response.data.token);
      }

      setIsAuthenticated(true);
      router.replace("../eyeglasses");
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#ccc"
      />
      <Button title="Login" onPress={handleLogin} />
      <Link href="../auth/register" style={styles.link}>
        Don't have an account? Register
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... define your styles here
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    marginBottom: 40,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 8,
  },
  link: {
    color: "#1e90ff",
    marginTop: 20,
    textAlign: "center",
  },
});

export default LoginScreen;
