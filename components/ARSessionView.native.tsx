// components/ARSessionView.native.tsx
import React from "react";
import { StyleSheet } from "react-native";
// import UnityView, { UnityModule } from "react-native-unity-view";

interface Props {
  modelUrl: string;
}

const ARSessionView: React.FC<Props> = ({ modelUrl }) => {
  React.useEffect(() => {
    // Send the model URL to Unity when the component mounts or modelUrl changes
    if (modelUrl) {
      // UnityModule.postMessage("ModelLoader", "LoadModel", modelUrl);
    }
  }, [modelUrl]);
  return null;

  // return <UnityView style={styles.unityView} />;
};

const styles = StyleSheet.create({
  unityView: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default ARSessionView;
