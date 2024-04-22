import FighterCard from "@/components/fighter-info-card";

const page = () => {
  const array = [
    { id: 1, name: "Fighter 1" },
    { id: 2, name: "Fighter 2" },
    { id: 3, name: "Fighter 3" },
    { id: 4, name: "Fighter 4" },
    { id: 5, name: "Fighter 5" },
  ];

  return (
    <>
      <h1 className="my-8"> All Fighters </h1>
      <div className="container mx-auto">
        <ul className="flex flex-wrap gap-6 w-full justify-evenly">
          {array.map((item) => (
            <li key={item.id} className="w-80">
              <FighterCard name={item.name} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default page;
