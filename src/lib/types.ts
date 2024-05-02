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
  lore: string;
  fight_count?: number;
}
export interface RecentFight {
  id: number;
  fighter1: string;
  fighter2: string;
  winner: string;
  fight_date: string;
}

export type elemental = "fire" | "ice" | "nature" | "lightning";
