# SoundKube.com

⚠️I have to approve your account on the spotify developer portal to use https://www.soundkube.co.uk/⚠️

Soundkube is a React Web app that uses the Spotify API to display users listening habits. Such as top artists and tracks within a given time range: long, medium and short-term. Also creates a visualisation of the user's top genres. 

<p align="center">
 <img src="https://github.com/AbuSuudy/SoundKube/assets/15980314/d199f513-a130-4e0c-b7f6-9ca091ea332c"/>
</p>

## Technology used 
React, Vite, Tailwind CSS, Headless UI, HighCharts and deployed to Azure Static Web Apps using Github actions. 

## Setup 
Due to Spotify branding guidelines, I would need to submit the app to Spotify to be approved to be used for a wider audience. This is just a side project so that is beyond the scope of this project. To be able to use https://www.soundkube.co.uk/  you would need to contact me to add you as a registered user on the Spotify developer dashboard. If not you could always create your own app on the Spotify developer dashboard and run this locally and plug in your credentials in a .env.development. file.

```comment
VITE_API_URL="https://accounts.spotify.com/"
VITE_SPOTIFY_API ="https://api.spotify.com/v1"
VITE_SPOTIFY_CLIENT_ID=""
VITE_SPOTIFY_REDIRECT_URI= "http://127.0.0.1:5173/Artist"
VITE_SPOTIFY_SCOPES = "user-top-read"
```

## Desktop Demo 

https://github.com/AbuSuudy/SoundKube/assets/15980314/66e7a500-c1d8-4045-8805-c2750418fc31

## Mobile Demo

<div align="center">
  <video  src="https://github.com/AbuSuudy/SoundKube/assets/15980314/68c662fd-6b2a-44bf-a2b6-f962ec1ab123" />
</div>
   
## Authentication 
Uses OAuth2 Authorisation code + PKCE since there is no backend (that I own) to this app it cannot securely store a Client Secret since the whole app is client side. The PKCE-enhanced Authorization Code Flow introduces a secret created by the calling application that can be verified by the authorization server; this secret is called the Code Verifier. Additionally, the calling app creates a transform value of the Code Verifier called the Code Challenge and sends this value over HTTPS to retrieve an Authorization Code. This way, a malicious attacker can only intercept the Authorization Code, and they cannot exchange it for a token without the Code Verifier.


