import { Fighter } from "@/components/fight-board";
import { getAllFighters } from "@/services/services";
import * as fs from "node:fs/promises";

export async function generateStaticParams() {
  const allFighters = await getAllFighters();

  return allFighters.map((animal: Fighter) => ({
    slug: animal.slug,
  }));
}

export default function SingleAnimalPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <h1>My Page {params.slug}</h1>;
      {/* <Image src={`/${params.slug}`} width={200} height={200} alt="animal" /> */}
    </>
  );
}
