import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Game } from "./components/Game";
import Pedometer from "./components/Pedometer";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#eee",
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Game />
      <Pedometer />
      <StatusBar style="auto" />
    </View>
  );
}
