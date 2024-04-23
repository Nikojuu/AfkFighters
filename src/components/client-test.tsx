"use client";

import { Fighter } from "./fight-board";

export interface FightersArray {
  data: Fighter[];
}

const ClientTest = ({ data }: FightersArray) => {
  console.log(data);

  return <h2></h2>;
};

export default ClientTest;
