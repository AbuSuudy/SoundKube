import spotifyIcon from "../src/assets/Spotify_icon.svg";
import {
  generateCodeChallenge,
  generateRandomString,
} from "./API/SpotifyAuthenticationAPI";
import SoundCube from "../src/assets/SoundCube.svg";
import { menuContext } from "./App";
import { Context, useContext } from "react";

function Login() {
  document.body.style.backgroundImage = `url(${SoundCube})`;
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center bottom";
  const { setNavBarVis, setSelectedIndex } = useContext(menuContext);
  setNavBarVis(false);

  return (
    <div className="opacity-0 fade-in rounded-lg relative bg-white px-6 pt-10 pb-8 shadow-2xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm: sm:px-10 ">
      <div className="mx-auto max-w-md">
        <img src={spotifyIcon} className="h-9" alt="Spotify" />
        <div className="divide-y divide-gray-300/50">
          <div className="space-y-6 py-1 text-[14.5px] md:text-lg lg:text-lg 2xl:text-lg leading-7 text-gray-600">
            <p>This app would allow you to:</p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2">
                  <circle cx="12" cy="12" r="11" />
                  <path
                    d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                    fill="none"
                  />
                </svg>
                <p className="ml-4">
                  View your top artist and tracks from a given date range
                </p>
              </li>
              <li className="flex items-center">
                <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2">
                  <circle cx="12" cy="12" r="11" />
                  <path
                    d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                    fill="none"
                  />
                </svg>
                <p className="ml-4">
                  Allow you to browse and visualise the different genres you
                  listen to
                </p>
              </li>
            </ul>
            <div className="flex-grow border-t border-gray-400 pt-6">
              You would need to log into Spotify
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 hover:text-white text-black font-bold py-2 px-4 rounded"
              onClick={async () => {
                let codeVerifier = generateRandomString(128);

                generateCodeChallenge(codeVerifier).then((codeChallenge) => {
                  let state = generateRandomString(16);
                  localStorage.setItem("code_verifier", codeVerifier);

                  let args = new URLSearchParams({
                    response_type: "code",
                    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
                    scope: import.meta.env.VITE_SPOTIFY_SCOPES,
                    redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
                    state: state,
                    code_challenge_method: "S256",
                    code_challenge: codeChallenge,
                  });

                  window.location.href =
                    "https://accounts.spotify.com/authorize?" + args;
                });
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
