import { Fighter } from "@/components/fight-board";
import { getAllFighters, getFighter } from "@/services/services";
import { sql } from "@vercel/postgres";
import { QueryResultRow } from "@vercel/postgres";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const result = await sql`
  SELECT slug FROM fighters
  `;

  const slugs = result.rows.map((row: QueryResultRow) => row.slug);
  return slugs.map((slug: string) => ({ slug }));
}

const SingleFighterPage = async ({ params }: { params: { slug: string } }) => {
  // fetch database
  async function test() {
    "use server";

    const result = await sql`
  SELECT  slug FROM fighters
  `;
    // Extract slugs from the result
    const slugs = result.rows.map((row: QueryResultRow) => row.slug);
    return slugs.map((slug: string) => ({ slug }));
  }
  test();
  const character = await getFighter({ slug: params.slug });

  return <div>hi {character.name}</div>;
};
export default SingleFighterPage;
