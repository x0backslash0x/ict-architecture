const express = require('express');
const app = express();
const hostname = "localhost";
const port = 3000;
const home = `http://${hostname}:${port}`

app.get('/', (req, res) => {
  const authURL = "https://github.com/login/oauth/authorize";
  res.redirect(authURL);
});

app.listen(port, hostname, () => {
  console.log(`server listening on ${home}`);
});
