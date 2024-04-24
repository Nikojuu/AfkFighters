import { Fighter } from "@/components/fight-board";
import { getAllFighters, getFighter } from "@/services/services";

export async function generateStaticParams() {
  const allFighters = await getAllFighters();

  return allFighters.map((animal: Fighter) => ({
    slug: animal.slug,
  }));
}

const SingleAnimalPage = async ({ params }: { params: { slug: string } }) => {
  // fetch database
  const character = await getFighter(params.slug);

  console.log(character);
  return (
    <div>
      

    </div>
  );
};
export default SingleAnimalPage;
