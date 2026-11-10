const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function testTMDbConnection() {
  const url = new URL(
    "https://api.themoviedb.org/3/search/movie"
  );

  url.searchParams.set("query", "Inception");

  const headers = {
    accept: "application/json",
  };

  if (ACCESS_TOKEN) {
    headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
  } else if (API_KEY) {
    url.searchParams.set("api_key", API_KEY);
  } else {
    throw new Error(
      "TMDb credentials are missing. Check .env.local."
    );
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`TMDb request failed: ${response.status}`);
  }

  const data = await response.json();

  console.log("TMDb connection successful!");
  console.log("Movie results:", data.results);

  return data.results;
}
