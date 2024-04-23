import fighters from "@/database/fighters.json";

export async function GET() {
  try {
    return Response.json({
      fighters: fighters.fighters,
    });
  } catch (error) {
    console.log(error);
  }
}
