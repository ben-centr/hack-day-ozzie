export interface Position {
  x: number;
  y: number;
}

export interface Particle {
  id: string;
  position: Position;
  opacity: number;
  initializedDate: number;
  assetIdx: number;
}