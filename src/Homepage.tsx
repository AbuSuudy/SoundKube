import { useState } from "react";
import Login from "./Login";
import Artist from "./Artist";
import jblSpeakerImg from "../src/assets/JBLSpeaker.svg";

function Homepage() {
  const [jblImageVisability, setJblImageVisability] = useState(true);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      setTimeout(function () {
        setJblImageVisability(false);
      }, 4000);
    }
  });

  return (
    <div className="App">
      {jblImageVisability ? (
        <img src={jblSpeakerImg} className="fade-out" />
      ) : localStorage.getItem("SPOTIFY_ACCESS_TOKEN") == null ? (
        <Login />
      ) : (
        <Artist />
      )}
    </div>
  );
}

export default Homepage;
