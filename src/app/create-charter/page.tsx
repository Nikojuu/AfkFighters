import { auth, currentUser } from "@clerk/nextjs/server";
const CreateCharterPage = () => {
  const { has, userId } = auth();
  console.log("userId", userId);

  const canManage = has({ permission: "org:team_settings:manage" });

  if (!canManage) return null;
  return (
    <div>
      {userId && <h1>user id: {userId}</h1>}
      <h1>create char</h1>
    </div>
  );
};

export default CreateCharterPage;
