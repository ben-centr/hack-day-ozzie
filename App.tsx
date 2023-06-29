import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Game } from "./components/Game";
import Pedometer from "./components/Pedometer";
import { useKoala } from "./hooks/useKoala";
import { useRef, useState } from "react";
import { useInterpolatedState } from "./hooks/useInterpolatedState";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#eee",
  },
});

export default function App() {
  const [currentStepCount, setCurrentStepCount] = useInterpolatedState(0);
  const {
    asset: koala,
    nextKoala,
    sizeMultiplier,
  } = useKoala({ steps: currentStepCount });

  const updateSteps = (steps: number) => {
    console.log(`Increasing to ${steps} `);
    setCurrentStepCount(steps);
    nextKoala();
  };

  return (
    <View style={styles.container}>
      <Game koalaAsset={koala} koalaSize={sizeMultiplier} />
      <Pedometer steps={currentStepCount} setSteps={updateSteps} />
      <StatusBar style="auto" />
    </View>
  );
}
