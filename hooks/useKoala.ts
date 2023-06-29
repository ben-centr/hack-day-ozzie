import { useAssets } from "expo-asset";
import { useState, useEffect } from "react";

const KOALA_SIZE_MULTIPLIER = 0.02;

interface UseKoalaArgs {
  steps: number;
}

export const useKoala = ({ steps }: UseKoalaArgs) => {
  const [koalaIdx, setKoalaIdx] = useState(0);
  const [assets, error] = useAssets([
    require("../assets/koala-right.png"),
    require("../assets/koala-left.png"),
  ]);

  if (error) {
    console.error(error);
  }

  const nextKoala = () => {
    setKoalaIdx((idx) => (idx + 1) % 2);
  };

  return {
    asset: assets?.[koalaIdx],
    nextKoala,
    sizeMultiplier: 1 + steps * KOALA_SIZE_MULTIPLIER,
  };
};
