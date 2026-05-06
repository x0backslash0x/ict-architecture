const express = require('express');
const app = express();
const hostname = "localhost";
const port = 3000;
const home = `http://${hostname}:${port}`

app.get('/', (req, res) => {
  const authURL = "https://github.com/login/oauth/authorize";
  const client_id = "Ov23liJaiLGqKAM0XaTC"
  const redirect_url = `${authURL}?client_id=${client_id}&redirect_url=${home}`
  console.log("redirecting to " + redirect_url)
  res.redirect(redirect_url); // BUG: moet een andere route zijn, zit nu in een loop
});

// in een andere route (callback) de code uit het response object tonen op de pagina

app.listen(port, hostname, () => {
  console.log(`server listening on ${home}`);
});
