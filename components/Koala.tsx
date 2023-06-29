import { Asset } from "expo-asset";
import { Image } from "expo-image";
import { Position } from "../types";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  koala: {
    position: "absolute",
    width: 100,
    height: 100,
  },
});

interface KoalaProps {
  position: Position;
  asset: Asset;
}

export const Koala = ({ position, asset }: KoalaProps) => {
  return (
    <Image
      style={{ left: position.x, top: position.y, ...styles.koala }}
      source={asset}
      contentFit="contain"
    />
  );
};
