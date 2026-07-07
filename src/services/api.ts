const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const get = async <T>(endpoint: string): Promise<T> => {
  console.log("BASE_URL:", BASE_URL);

  const response = await fetch(`${BASE_URL}/${endpoint}`);

    console.log(`Fetching: ${BASE_URL}/${endpoint}`);


  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return response.json();
};