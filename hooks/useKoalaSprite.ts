import { useAssets } from "expo-asset";
import { useState, useEffect } from "react";

export const useKoala = () => {
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
    console.log("nextkoala");
  };

  return {
    asset: assets?.[koalaIdx],
    nextKoala,
  };
};
