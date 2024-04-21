const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchRandomFighters = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/fighters`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
