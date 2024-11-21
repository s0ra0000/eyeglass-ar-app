import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useLocalSearchParams } from "expo-router";
// import UnityView, { UnityModule } from "react-native-unity-view";
interface Eyeglass {
  id: number;
  name: string;
  description: string;
  image_url: string;
  model_url: string;
}

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

const ARSessionScreen: React.FC = () => {
  const [eyeglasses, setEyeglasses] = useState<Eyeglass[]>([]);
  const [selectedEyeglass, setSelectedEyeglass] = useState<Eyeglass | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { eyeglassId } = useLocalSearchParams();

  useEffect(() => {
    fetchEyeglasses();
  }, []);

  const fetchEyeglasses = async () => {
    try {
      let token;
      if (isWeb) {
        token = localStorage.getItem("token");
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
      const initialEyeglass = response.data.find(
        (e: Eyeglass) => e.id === parseInt(eyeglassId as string)
      );
      setSelectedEyeglass(initialEyeglass || response.data[0]);
      if (initialEyeglass && !isWeb) {
        loadModel(initialEyeglass.model_url);
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch eyeglasses.");
    } finally {
      setLoading(false);
    }
  };

  const handleEyeglassSelect = (eyeglass: Eyeglass) => {
    setSelectedEyeglass(eyeglass);
    if (!isWeb) {
      loadModel(eyeglass.model_url);
    }
  };

  const loadModel = (modelUrl: string) => {
    try {
      // UnityModule.postMessage("ModelLoader", "LoadModel", modelUrl);
    } catch (error) {
      console.error("Error sending model to Unity:", error);
    }
  };

  const renderEyeglassItem = ({ item }: { item: Eyeglass }) => (
    <TouchableOpacity onPress={() => handleEyeglassSelect(item)}>
      <Image source={{ uri: item.image_url }} style={styles.carouselImage} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#fff" />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.arSession}>
        {isWeb ? (
          <Text style={styles.webPlaceholder}>
            AR functionality is not supported on the web.
          </Text>
        ) : (
          <Text style={styles.webPlaceholder}>
            AR functionality is not supported on the web.
          </Text>
          // <UnityView style={styles.unityView} />
        )}
      </View>
      <View style={styles.carouselContainer}>
        <FlatList
          data={eyeglasses}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderEyeglassItem}
          contentContainerStyle={styles.carouselContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  arSession: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  webPlaceholder: {
    color: "#fff",
    fontSize: 18,
  },
  unityView: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  carouselContainer: {
    height: 100,
    backgroundColor: "#1e1e1e",
  },
  carouselContent: {
    alignItems: "center",
  },
  carouselImage: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 40,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
});

export default ARSessionScreen;
