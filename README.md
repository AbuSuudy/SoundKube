# SoundKube

Soundkube is an web app that uses the spotify api to display a users listening habits. Such as top artists and tracks within a given time range: long, medium and short term. Also creates a visulisation of the users top genres. <br>  <br> <br>

<p align="center">
<img  src="https://github.com/AbuSuudy/SoundKube/assets/15980314/27ebd7d2-584c-4d99-bdec-a73e6c213b18"/>
</p>
 <br> <br>

## Technology used 
React, Vite build tool, tailwind CSS, HighCharts and deployed to Azure Static Web Apps using Github actions. 

## Setup 
Due to spotify branding guidlines I would need to submit the app to spotify to be approved to be used for a wider audience. This is just a side project so that is beyond the scope of this project. To be able use https://www.soundkube.com/  you would need to contact me to add you as a registered user on the spotify developer dashboard. If not you could always create your own app on the spotify developer dashboard and run this loacally and plug in your credentials in a .env.development. file.

```comment
VITE_API_URL="https://accounts.spotify.com/"
VITE_SPOTIFY_API ="https://api.spotify.com/v1"
VITE_SPOTIFY_CLIENT_ID=""
VITE_SPOTIFY_REDIRECT_URI= "http://127.0.0.1:5173/Artist"
VITE_SPOTIFY_SCOPES = "user-top-read"
```
## Mobile Demo

<div align="center">
  <video  src="https://github.com/AbuSuudy/SoundKube/assets/15980314/b6c5a356-094e-4716-ae55-8a6720138a42"  width="500" />
</div>
   
## Authentication 
Uses OAuth2 Authorisation code + PKCE since there is no backend to this app it cannot securely store a Client Secret because their entire source is available to the browser. The PKCE-enhanced Authorization Code Flow introduces a secret created by the calling application that can be verified by the authorization server; this secret is called the Code Verifier. Additionally, the calling app creates a transform value of the Code Verifier called the Code Challenge and sends this value over HTTPS to retrieve an Authorization Code. This way, a malicious attacker can only intercept the Authorization Code, and they cannot exchange it for a token without the Code Verifier.


