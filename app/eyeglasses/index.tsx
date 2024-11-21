// app/eyeglasses/index.tsx
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { useRouter } from "expo-router";
import { AuthContext } from "../../contexts/AuthContext";

interface Eyeglass {
  id: number;
  name: string;
  description: string;
  image_url: string;
  model_url: string;
}
const isWeb = Platform.OS === "web";
const EyeglassListScreen: React.FC = () => {
  const [eyeglasses, setEyeglasses] = useState<Eyeglass[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // if (!isAuthenticated) {
    //   router.replace("../auth/login");
    // } else {

    // }
    fetchEyeglasses();
  }, [isAuthenticated]);

  const fetchEyeglasses = async () => {
    try {
      let token;
      if (isWeb) {
        token = localStorage.getItem("token"); // Use LocalStorage for web
      } else {
        token = await SecureStore.getItemAsync("token");
      }
      const response = await axios.get(
        "https://eyeglass-ar-backend-one.vercel.app/eyeglasses",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEyeglasses(response.data);
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch eyeglasses.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Eyeglass }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => router.push(`../eyeglasses/${item.id}`)}
    >
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#fff" />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={eyeglasses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... define your styles here
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  listContent: {
    padding: 10,
  },
  itemContainer: {
    backgroundColor: "#1e1e1e",
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    height: 200,
    width: "100%",
  },
  name: {
    color: "#fff",
    fontSize: 20,
    margin: 10,
  },
  description: {
    color: "#ccc",
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default EyeglassListScreen;
