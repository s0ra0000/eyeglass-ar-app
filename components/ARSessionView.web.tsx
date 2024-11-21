// components/ARSessionView.web.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ARSessionView: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>
        AR functionality is not supported on the web.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ARSessionView;
