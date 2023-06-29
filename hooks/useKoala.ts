import { useAssets } from "expo-asset";
import { useState } from "react";

const KOALA_SIZE_MULTIPLIER = 0.01;

interface UseKoalaArgs {
  steps: number;
}

export const useKoala = ({ steps }: UseKoalaArgs) => {
  const [koalaIdx, setKoalaIdx] = useState(0);
  const [koala1Assets] = useAssets([
    require("../assets/koala-right.png"),
    require("../assets/koala-left.png"),
  ]);
  const [koala2Assets] = useAssets([
    require("../assets/koala-right-2.png"),
    require("../assets/koala-left-2.png"),
  ]);
  const [koala3Assets] = useAssets([
    require("../assets/koala-right-3.png"),
    require("../assets/koala-left-3.png"),
  ]);
  const [koala4Assets] = useAssets([
    require("../assets/koala-right-4.png"),
    require("../assets/koala-left-4.png"),
  ]);

  let assets = koala1Assets;
  if (steps > 50) {
    assets = koala2Assets;
  }
  if (steps > 100) {
    assets = koala3Assets;
  }
  if (steps > 150) {
    assets = koala4Assets;
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
