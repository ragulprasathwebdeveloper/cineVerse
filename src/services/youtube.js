const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export async function searchMovieTrailer(title, year) {
  try {
    const searchQuery = `${title} ${year} official trailer`;

    const url = new URL("https://www.googleapis.com/youtube/v3/search");

    url.search = new URLSearchParams({
      part: "snippet",
      q: searchQuery,
      type: "video",
      videoEmbeddable: "true",
      maxResults: "5",
      key: API_KEY,
    });

    const response = await fetch(url);

    if (!response.ok) {
      console.error("YouTube API error:", data.error);
      throw new Error(data.error?.message || "YouTube API request failed");
    }

    const data = await response.json();

    return data.items || [];
  } catch (error) {
    console.error("Trailer search error:", error);
    return [];
  }
}
