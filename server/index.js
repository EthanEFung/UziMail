const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const configureEnv = require("../lib/configureEnv");

configureEnv("../");
const port = process.env.PORT || 3000;
const app = express();
const router = require("./routes/index");

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, "../", "client")))
  .use(router);

app.listen(port, err => {
  if (err) throw err;
  console.log("listening on port", port);
});
