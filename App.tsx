import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View } from "react-native";
import { Game } from "./components/Game";
import Pedometer from "./components/Pedometer";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
