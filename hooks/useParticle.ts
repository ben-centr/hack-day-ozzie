import { useState } from "react";
import { Position } from "../types";

interface UseParticleArgs {
  initialPosition: Position;
}

const useParticle = ({ initialPosition }: UseParticleArgs) => {
  const [offset, setOffset] = useState(0);
  const [opacity, setOpacity] = useState(1);

  return { offset, opacity };
};
