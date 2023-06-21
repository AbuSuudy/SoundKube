import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ChartData, SpotifySearchParam, GenreTable } from "../Model/Models";
import { Tracks, TrackItem } from "../Model/Tracks";
import { Artist, ArtistItem } from "../Model/ArtistModel";
const spotifyAuthenticationAPI = axios.create({
  baseURL: import.meta.env.VITE_SPOTIFY_API,
});

export const topGenres = async (param: SpotifySearchParam) => {
  var response = await spotifyAuthenticationAPI.get<Artist>("/me/top/artists", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("SPOTIFY_ACCESS_TOKEN")}`,
    },
    params: {
      time_range: param.TimeRange,
      limit: param.Limit,
      offset: param.Offset,
    },
  });

  //Gets Genres
  let Genres: string[] = [];
  response.data.items.forEach((element: ArtistItem) => {
    Genres.push(...element.genres);
  });

  //Counts occurances of each genre
  const occurrences = Genres.reduce((acc: any, item: any) => {
    return acc[item] ? (acc[item] = acc[item] + 1) : (acc[item] = 1), acc;
  }, {});

  //Formats it for table and chart
  let tableData: GenreTable[] = [];
  let chartData: ChartData[] = [];
  const formatted = Object.entries(occurrences)
    .sort((a: any, b: any) => {
      return b[1] - a[1];
    })
    .forEach((x) => {
      chartData.push({
        data: [
          {
            name: x[0],
            value: x[1] as number,
          },
        ],
      });

      tableData.push({
        name: x[0],
        value: x[1] as number,
      });
    });

  return {
    chart: chartData,
    table: tableData,
  };
};

export const topArtist = async (param: SpotifySearchParam) => {
  try {
    let artistResponse: ArtistItem[] = [];

    let offset = 0;
    for (let i = 0; i < 2; i++) {
      let response = await spotifyAuthenticationAPI.get<Artist>(
        "/me/top/artists",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "SPOTIFY_ACCESS_TOKEN"
            )}`,
          },
          params: {
            time_range: param.TimeRange,
            limit: param.Limit,
            offset: offset,
          },
        }
      );

      artistResponse = artistResponse.concat(response.data.items);
      offset += 49;
    }

    return artistResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status == 403) {
        toast.error(
          "You would need to pass on your spotify email to the admin of the system.",
          { autoClose: false }
        );
      } else {
        toast.error("Error Getting Top Artist");
      }
    }
  }
};

export const topTracks = async (param: SpotifySearchParam) => {
  try {
    let responseData: TrackItem[] = [];
    let offset = 0;
    for (let i = 0; i < 2; i++) {
      let response = await spotifyAuthenticationAPI.get<Tracks>(
        "/me/top/tracks",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "SPOTIFY_ACCESS_TOKEN"
            )}`,
          },
          params: {
            time_range: param.TimeRange,
            limit: param.Limit,
            offset: offset,
          },
        }
      );

      offset += 49;
      responseData = responseData.concat(response?.data.items);
    }

    return responseData;
  } catch (error) {
    toast.error("Error Getting Top Tracks");
  }
};
