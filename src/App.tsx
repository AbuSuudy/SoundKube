import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { spotifyRefreshAccessToken } from "./API/SpotifyAuthenticationAPI";
import "./App.css";
import Artist from "./Artist";
import GenreChart from "./GenreChart";
import Homepage from "./Homepage";
import Login from "./Login";
import { contextInital } from "./Model/Models";
import TabGroup from "./TabGroup";
import Tracks from "./Tracks";

let initalVal: contextInital = {
  setNavBarVis: () => {},
  selectedIndex: 0,
  setSelectedIndex: () => {},
};

export const menuContext = createContext(initalVal);

function App() {
  const [navBarVis, setNavBarVis] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  setInterval(() => {
    spotifyRefreshAccessToken();
  }, 3601000);

  let location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("SPOTIFY_ACCESS_TOKEN")) {
      spotifyRefreshAccessToken();
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("SPOTIFY_ACCESS_TOKEN")) {
      setNavBarVis(true);
    }
  }, [location]);

  return (
    <>
      <ToastContainer />
      <menuContext.Provider
        value={{ setNavBarVis, selectedIndex, setSelectedIndex }}
      >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Artist" element={<Artist />} />
          <Route path="/Tracks" element={<Tracks />} />
          <Route path="/Genre" element={<GenreChart />} />
          <Route path="/*" element={<Homepage />} />
        </Routes>
        {navBarVis ? <TabGroup /> : <></>}
      </menuContext.Provider>
    </>
  );
}

export default App;
