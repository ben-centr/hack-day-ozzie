import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  GameLoop,
  GameLoopUpdateEventOptionType,
} from "react-native-game-engine";

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
});

interface Position {
  x: number;
  y: number;
}

export const Game = () => {
  const [playerPosition, setPlayerPosition] = useState<Position>({
    x: 50,
    y: 50,
  });

  const updateHandler = ({ touches }: GameLoopUpdateEventOptionType) => {
    let move = touches.find((x) => x.type === "move");
    if (move) {
      console.log(move);
      setPlayerPosition(({ x, y }) => ({
        x: x + move.delta.pageX,
        y: y + move.delta.pageY,
      }));
    }
  };

  return (
    <GameLoop style={styles.outerContainer} onUpdate={updateHandler}>
      <View
        style={{
          left: playerPosition.x,
          top: playerPosition.y,
          ...styles.player,
        }}
      />
    </GameLoop>
  );
};
