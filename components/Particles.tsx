import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { Particle } from "../types";

interface ParticlesProps {
  particles: Array<Particle>;
}

export const Particles = ({ particles }: ParticlesProps) => {
  const [assets] = useAssets([
    require("../assets/centr-logo-ozzie.png"),
    require("../assets/chris-small.png"),
  ]);

  return (
    <>
      {particles.map((particle) => (
        <Image
          key={particle.id}
          style={{
            position: "absolute",
            opacity: particle.opacity,
            left: particle.position.x,
            top: particle.position.y,
            width: 30,
            height: 30,
          }}
          source={assets?.[particle.assetIdx]}
          contentFit="contain"
        />
      ))}
    </>
  );
};
