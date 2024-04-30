import FightBoard from "@/components/fight-board";
export const dynamic = "force-dynamic";
export const revalidate = 0;
const page = () => {
  return (
    <>
      <FightBoard />
    </>
  );
};

export default page;
