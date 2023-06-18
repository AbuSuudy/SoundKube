export type GenreTable = {
  name: string;
  value: number;
};

export type contextInital = {
  setNavBarVis: React.Dispatch<boolean>;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<number>;
};

export type Params = {
  Token: string;
  Offset: number;
  Limit: number;
  TimeRange: string;
};

export type ArtistTable = {
  image: string;
  name: string;
  genres: string[];
};

export type SpotifyTimeRange = {
  label: string;
  value: string;
};

export type TracksTable = {
  image: string;
  name: string;
  track: string;
};

export type TableData = {
  name: string;
  value: number;
};

export type GenreReturn = {
  table: TableData[];
  chart: ChartData[];
};

export type ChartData = {
  data: [
    {
      name: string;
      value: number;
    }
  ];
};

export interface SpotifySearchParam {
  Token?: string;
  Offset: number;
  Limit: number;
  TimeRange: string;
}
