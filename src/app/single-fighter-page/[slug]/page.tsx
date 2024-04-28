import { Vortex } from "@/components/ui/vortex";
import { getFighter } from "@/services/services";
import { sql } from "@vercel/postgres";
import { QueryResultRow } from "@vercel/postgres";
import Image from "next/image";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const result = await sql`
  SELECT slug FROM fighters
  `;

  const slugs = result.rows.map((row: QueryResultRow) => row.slug);
  return slugs.map((slug: string) => ({ slug }));
}

const SingleFighterPage = async ({ params }: { params: { slug: string } }) => {
  const character = await getFighter({ slug: params.slug });

  return (
    <>
      <div className=" overflow-hidden absolute   h-full  w-full">
        <Vortex className="flex items-center flex-col justify-center  py-4 w-full h-full z-0"></Vortex>
      </div>
      <main className="relative z-10 container mx-auto  min-h-[100vh]">
        <h1 className="mt-16">{character.name} The great</h1>
        <div className="mt-16 flex flex-col md:flex-row justify-center items-center  gap-16">
          <div className="relative w-[40vw] aspect-square rounded-2xl border-y-2 border-pink-600 box-shadow">
            <Image
              src={character.imgsrc}
              alt={character.name}
              fill
              className="object-cover rounded-2xl "
            />
          </div>
          <div className=" w-full md:w-[40vw] p-8 glass-box border-y border-pink-600 box-shadow">
            <div className="flex justify-between pb-4   ">
              <p className="font-bold">Health: {character.hitpoints} ❤️</p>
              <p className="font-bold">Defense: {character.defence}🛡️</p>
              <p className="font-bold">Attack: {character.attack} ⚔️</p>
            </div>
            <span className="font-bold">Lore:</span>
            <p className="pt-4">{character.description}</p>
          </div>
        </div>
      </main>
    </>
  );
};
export default SingleFighterPage;
