import { Dashboard } from "@/components/dashboard";
import { auth } from "@clerk/nextjs/server";

const page = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};

export default page;
