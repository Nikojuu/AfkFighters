// import { Fighter } from "@/components/fight-board";
// import { getAllFighters, getFighter } from "@/services/services";

// export const dynamic = "force-dynamic";

// export async function generateStaticParams() {
//   const allFighters = await getAllFighters();

//   return allFighters.map((animal: Fighter) => ({
//     slug: animal.slug,
//   }));
// }

// const SingleFighterPage = async ({ params }: { params: { slug: string } }) => {
//   // fetch database

//   const character = await getFighter({ slug: params.slug });

//   return <div>hi {character.name}</div>;
// };
// export default SingleFighterPage;
