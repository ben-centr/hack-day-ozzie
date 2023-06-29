import { useEffect, useRef, useState } from "react";
import { Position } from "../types";

interface UseParticleArgs {
  initialPosition: Position;
}

export const useParticle = ({ initialPosition }: UseParticleArgs) => {
  const [offset, setOffset] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const mountTime = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const time = Date.now() - mountTime.current;
      const newOffset = time / 1000;
      const newOpacity = 1 - newOffset;

      setOffset(newOffset);
      setOpacity(newOpacity);

      if (newOpacity <= 0) {
        clearInterval(interval);
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, []);

  return {
    position: {
      x: initialPosition.x,
      y: initialPosition.y + offset,
    },
    opacity,
  };
};
