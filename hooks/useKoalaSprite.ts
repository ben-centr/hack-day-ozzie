import { useAssets } from "expo-asset";
import { useState, useEffect } from "react";

export const useKoala = () => {
  const [assets, error] = useAssets([
    require("../assets/koala-right.png"),
    require("../assets/koala-left.png"),
  ]);

  const [koalaIdx, setKoalaIdx] = useState(0);

  useEffect(() => {
    const swapKoala = () => {
      setKoalaIdx((idx) => (idx + 1) % 2);
    };

    const interval = setInterval(swapKoala, 700);

    return () => clearInterval(interval);
  }, []);

  return assets?.[koalaIdx];
};
