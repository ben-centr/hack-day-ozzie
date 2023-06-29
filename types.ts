export interface Position {
  x: number;
  y: number;
}

export interface Particle {
  id: number;
  position: Position;
  opacity: number;
  initializedDate: number;
}