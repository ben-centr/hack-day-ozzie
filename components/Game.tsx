import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  GameLoop,
  GameLoopUpdateEventOptionType,
} from "react-native-game-engine";
import { useKoala } from "../hooks/useKoalaSprite";

const RADIUS = 25;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: "lightblue",
  },
  player: {
    position: "absolute",
    backgroundColor: "pink",
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS * 2,
  },
  image: {
    width: 100,
    height: 100,
  },
});

interface Position {
  x: number;
  y: number;
}

export const Game = () => {
  const koala = useKoala();
  console.log(koala);

  const [koalaPosition, setKoalaPosition] = useState<Position>({
    x: 50,
    y: 50,
  });

  const updateHandler = ({ touches }: GameLoopUpdateEventOptionType) => {
    let press = touches.find((x) => x.type === "press");
    if (press) {
      setKoalaPosition({
        x: press.event.pageX,
        y: press.event.pageY,
      });
    }
  };

  return (
    <GameLoop style={styles.outerContainer} onUpdate={updateHandler}>
      <Image
        style={{ left: koalaPosition.x, top: koalaPosition.y, ...styles.image }}
        source={koala}
        contentFit="contain"
      />
    </GameLoop>
  );
};
