const MOVIE_API = "http://www.omdbapi.com/?i=tt3896198&apikey=9bbe1c9b";

async function movies() {
  try {
    const response = await fetch(MOVIE_API);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const result = await response.json();

    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

movies();
