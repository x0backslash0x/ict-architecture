const express = require('express');
const app = express();
const hostname = "localhost";
const port = 3000;
const home = `http://${hostname}:${port}`

app.get('/', (req, res) => {
  const authURL = "https://github.com/login/oauth/authorize";
  const client_id = "Ov23liJaiLGqKAM0XaTC"
  const scope = 'user%20public_repo%20openid'
  const redirect_url = `${authURL}?client_id=${client_id}&scope=${scope}`
  console.log("redirecting to " + redirect_url)
  res.redirect(redirect_url);
});

app.get('/callback', (req, res) => {
  console.log("terug van Github")
  // info die Github meegeeft tonen, zoals in video
  console.log(res)
  res.status(200).send("callback ok\n," + res);
});

app.listen(port, hostname, () => {
  console.log(`server listening on ${home}`);
});
