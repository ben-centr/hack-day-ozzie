import { Asset } from "expo-asset";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { Position } from "../types";

const styles = StyleSheet.create({
  koala: {
    position: "absolute",
  },
});

interface KoalaProps {
  position: Position;
  asset: Asset;
  sizeMultiplier: number;
}

export const Koala = ({ position, asset, sizeMultiplier }: KoalaProps) => {
  const width = 100 * sizeMultiplier;
  const height = 100 * sizeMultiplier;
  return (
    <Image
      style={{
        left: position.x,
        top: position.y,
        width,
        height,
        ...styles.koala,
      }}
      source={asset}
      contentFit="contain"
    />
  );
};
