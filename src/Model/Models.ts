export interface Artist {
  items: Item[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string;
  previous: any;
}

export interface Item {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: any;
  total: number;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Headers {
  "content-type": string;
}

export type GenreTable = {
  name: string;
  value: number;
};

export interface Config {
  transitional: Transitional;
  adapter: string[];
  transformRequest: any[];
  transformResponse: any[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Env;
  headers: Headers2;
  baseURL: string;
  params: Params;
  method: string;
  url: string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Env {}

export interface Headers2 {
  Accept: string;
}

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
