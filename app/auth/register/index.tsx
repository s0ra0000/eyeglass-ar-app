// app/auth/register.tsx
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import axios from "axios";
import { Link, useRouter } from "expo-router";

const RegisterScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await axios.post(
        "https://eyeglass-ar-backend-one.vercel.app/auth/register",
        {
          username,
          email,
          password,
        }
      );
      Alert.alert("Registration Successful", "You can now log in.");
      router.replace("../auth/login");
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error.response?.data?.message || "Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#ccc"
      />
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
      <Button title="Register" onPress={handleRegister} />
      <Link href="../auth/login" style={styles.link}>
        Already have an account? Login
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  // Same styles as LoginScreen
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

export default RegisterScreen;
