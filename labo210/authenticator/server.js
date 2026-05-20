const express = require('express');
const app = express();
const hostname = "localhost";
const port = 3000;
const home = `http://${hostname}:${port}`
const CLIENT_ID = "Ov23liJaiLGqKAM0XaTC"
const authURL = "https://github.com/login/oauth/authorize";
const SCOPE = 'user%20public_repo%20openid'
const CLIENT_SECRET = '8f3116d68872f439a6156cd4cb5bf543013935e4'
const redirect_url = `${authURL}?client_id=${CLIENT_ID}&scope=${SCOPE}`

app.get('/', (req, res) => {
  console.log("redirecting to " + redirect_url)
  res.redirect(redirect_url);
});

//app.get('/callback', (req, res) => {
app.get('/callback', async (req, res) => {
  console.log("terug van Github")
  // info die Github meegeeft tonen, zoals in video
  // code die Github terug geeft
  const CODE = req.query.code
  console.log(`code: ${CODE}`)

  //code inwisselen voor access token //
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: CODE,
    redirect_url: redirect_url,
    state: SCOPE,
  });

  const codeExchange = await fetch("https://github.com/login/oauth/access_token", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString()
  });
  const tokenData = await codeExchange.json();
  const accessToken = tokenData.access_token
  console.log(tokenData)
  console.log(`access_token: ${accessToken}`)

  // antwoord terug sturen
  res.status(200).send(tokenData);
});

app.listen(port, hostname, () => {
  console.log(`server listening on ${home}`);
});
