import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  ChartData,
  Artist,
  SpotifySearchParam,
  Item,
  GenreTable,
} from "../Model/Models";
import { Tracks } from "../Model/Tracks";
import { useNavigate } from "react-router-dom";
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
  response.data.items.forEach((element: Item) => {
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
  
const navigate = useNavigate();
  try {
    return await spotifyAuthenticationAPI.get<Artist>("/me/top/artists", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("SPOTIFY_ACCESS_TOKEN")}`,
      },
      params: {
        time_range: param.TimeRange,
        limit: param.Limit,
        offset: param.Offset,
      },
    });
  } catch (error) {
  
    if (axios.isAxiosError(error)) {

      console.log(error);

       if(error.response?.status == 403){

        navigate("/Login")
        toast.error("You would need to pass on spotify email to admin to use the system.", {autoClose : false});

       }else{

        toast.error("Error Getting Top Artist");

       }
    }
  }
};

export const topTracks = async (param: SpotifySearchParam) => {
  try {
    return await spotifyAuthenticationAPI.get<Tracks>("/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("SPOTIFY_ACCESS_TOKEN")}`,
      },
      params: {
        time_range: param.TimeRange,
        limit: param.Limit,
        offset: param.Offset,
      },
    });
  } catch (error) {
    toast.error("Error Getting Top Tracks");
  }
};
