import { z } from "zod";

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

export const FighterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Charter name must be atleast 3 character long" })
    .max(20, { message: "Charter name must be atmost 20 character long" }),
  picture: z.string().min(0, { message: "You need to provide image" }),
  weakness: z.enum(["ice", "fire", "lightning", "nature"], {
    message: "Invalid weakness",
  }),
  attack: z.number().min(0).max(500),
  defence: z.number().min(0).max(500),
  hitpoints: z.number().min(0).max(500),
  description: z.string().min(10).trim().max(250),
  lore: z.string().min(10).trim().max(900),
});
