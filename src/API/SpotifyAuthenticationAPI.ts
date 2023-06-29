import axios from "axios";
import { toast } from "react-toastify";

const spotifyAuthenticationAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//Code verifier is a high-entropy cryptographic random string with a length between 43 and 128 character
export function generateRandomString(length: number) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

//code verifier has been generated, we must transform (hash) it using the SHA256 algorithm.
//This is the value that will be sent within the user authorization request.
export async function generateCodeChallenge(codeVerifier: string) {
  function base64encode(digestString: ArrayBuffer) {
    // @ts-ignore
    return btoa(String.fromCharCode.apply(null, new Uint8Array(digestString)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

export const spotifyAccessToken = async (code: string) => {
  try {
    let response = await spotifyAuthenticationAPI.post(
      "api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        code_verifier: localStorage.getItem("code_verifier") ?? "",
      })
    );

    if (response.data.access_token != null) {
      localStorage.setItem("SPOTIFY_ACCESS_TOKEN", response.data.access_token);
      localStorage.setItem(
        "SPOTIFY_REFRESH_TOKEN",
        response.data.refresh_token
      );
    }

    return response.data.access_token;
  } catch (error) {
    toast.error("Error  Access Token");
  }
};

export const spotifyRefreshAccessToken = async () => {
  try {
    let response = await spotifyAuthenticationAPI.post(
      "api/token",
      {
        grant_type: "refresh_token",
        refresh_token: localStorage.getItem("SPOTIFY_REFRESH_TOKEN"),
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      },
      { headers: { "content-type": "application/x-www-form-urlencoded" } }
    );

    if (response.data.access_token != null) {
      localStorage.setItem("SPOTIFY_ACCESS_TOKEN", response.data.access_token);
      localStorage.setItem(
        "SPOTIFY_REFRESH_TOKEN",
        response.data.refresh_token
      );
    }
  } catch (error) {
    if (document.onfocus) {
      toast.error("Error Refreshing Access Token");
    }
  }
};
