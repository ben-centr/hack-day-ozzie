import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  GameLoop,
  GameLoopUpdateEventOptionType,
} from "react-native-game-engine";
import { useKoala } from "../hooks/useKoalaSprite";
import { Position } from "../types";

const RADIUS = 25;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: "lightblue",
  },
  image: {
    width: 100,
    height: 100,
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.75,
  },
});

export const Game = () => {
  const { asset: koala, nextKoala } = useKoala();
  const [assets] = useAssets([
    require("../assets/background.png"),
    require("../assets/centr-logo-ozzie.png"),
  ]);

  const [koalaPosition, setKoalaPosition] = useState<Position>({
    x: 150,
    y: 250,
  });

  const updateHandler = ({ touches }: GameLoopUpdateEventOptionType) => {
    let press = touches.find((x) => x.type === "press");
    if (press) {
      // setKoalaPosition({
      //   x: press.event.pageX,
      //   y: press.event.pageY,
      // });
      nextKoala();
    }
  };

  useEffect(() => {
    const moveKoala = () => {
      setKoalaPosition((prev) => {
        if (prev.y === 250) {
          return { ...prev, y: 260 };
        }
        return { ...prev, y: 250 };
      });
    };
    const interval = setInterval(moveKoala, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GameLoop style={styles.outerContainer} onUpdate={updateHandler}>
      <Image
        style={styles.background}
        source={assets?.[0]}
        contentFit="cover"
      />
      <Image
        style={{
          opacity: 0.5,
          left: koalaPosition.x,
          top: koalaPosition.y,
          width: 30,
          height: 30,
        }}
        source={assets?.[1]}
        contentFit="contain"
      />
      <Image
        style={{ left: koalaPosition.x, top: koalaPosition.y, ...styles.image }}
        source={koala}
        contentFit="contain"
      />
    </GameLoop>
  );
};
