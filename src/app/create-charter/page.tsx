import CreateChar from "@/components/create-char";
import NoAuthorization from "@/components/no-authorization";
import { Protect } from "@clerk/nextjs";

const CreateCharterPage = async () => {
  return (
    <Protect permission="org:feature:permission" fallback={<NoAuthorization />}>
      <CreateChar />
    </Protect>
  );
};

export default CreateCharterPage;
