const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export const fetchRandomFighters = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/fighters`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
