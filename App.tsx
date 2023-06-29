import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Game } from "./components/Game";
import Pedometer from "./components/Pedometer";
import { useKoala } from "./hooks/useKoala";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#eee",
  },
});

export default function App() {
  const { asset: koala, nextKoala } = useKoala();

  return (
    <View style={styles.container}>
      <Game koalaAsset={koala} />
      <Pedometer onStep={nextKoala} />
      <StatusBar style="auto" />
    </View>
  );
}
