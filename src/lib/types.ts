export interface Fighter {
  name: string;
  slug: string;
  description: string;
  attack: number;
  hitpoints: number;
  weakness: string;
  imgsrc: string;
  winstreak: number;
  totalwins: number;
  defence: number;
}

export type elemental = "fire" | "ice" | "nature" | "lightning";
