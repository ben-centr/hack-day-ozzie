import { Asset, useAssets } from "expo-asset";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  GameLoop,
  GameLoopUpdateEventOptionType,
} from "react-native-game-engine";
import uuid from "react-native-uuid";
import { Particle as ParticleType, Position } from "../types";
import { Koala } from "./Koala";
import { Particles } from "./Particles";

const PARTICLE_TTL = 2000;
const PARTICLE_SPEED = 3;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: "lightblue",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.75,
  },
});

interface GameProps {
  koalaAsset: Asset;
  koalaSize: number;
}

export const Game = ({ koalaAsset, koalaSize }: GameProps) => {
  const INITIAL_KOALA_Y = 300 - (koalaSize - 1) * 50;

  const [koalaPosition, setKoalaPosition] = useState<Position>({
    x: 150 - (koalaSize - 1) * 50,
    y: INITIAL_KOALA_Y,
  });

  const [particles, setParticles] = useState<Array<ParticleType>>([]);

  const addParticle = (position: Position) => {
    setParticles((prev) => {
      return [
        ...prev,
        {
          id: uuid.v4().toString(),
          initializedDate: new Date().getTime(),
          opacity: 1,
          position,
          assetIdx: Math.floor(Math.random() * 2),
        },
      ];
    });
  };

  const handleGameUpdate = ({ touches }: GameLoopUpdateEventOptionType) => {
    let press = touches.find((x) => x.type === "press");
    if (press) {
      addParticle({
        x: press.event.pageX,
        y: press.event.pageY,
      });
    }
  };

  useEffect(() => {
    const moveKoala = () => {
      setKoalaPosition((prev) => {
        if (prev.y === INITIAL_KOALA_Y) {
          return { ...prev, y: INITIAL_KOALA_Y - 10 };
        }
        return { ...prev, y: INITIAL_KOALA_Y };
      });
    };
    const interval = setInterval(moveKoala, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateParticles = () => {
      setParticles((prev) => {
        return prev
          .filter((particle) => particle.opacity > 0)
          .map((particle) => {
            const now = new Date().getTime();
            const diff = now - particle.initializedDate;

            const opacity = 1 - diff / PARTICLE_TTL;
            const position = {
              x: particle.position.x,
              y: particle.position.y - PARTICLE_SPEED,
            };
            return {
              ...particle,
              opacity,
              position,
            };
          });
      });
    };

    const interval = setInterval(updateParticles, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <GameLoop style={styles.outerContainer} onUpdate={handleGameUpdate}>
      <Background />
      <Koala
        asset={koalaAsset}
        position={koalaPosition}
        sizeMultiplier={koalaSize}
      />
      <Particles particles={particles} />
    </GameLoop>
  );
};

const Background = () => {
  const [assets] = useAssets([require("../assets/background.png")]);
  return (
    <Image style={styles.background} source={assets?.[0]} contentFit="cover" />
  );
};
