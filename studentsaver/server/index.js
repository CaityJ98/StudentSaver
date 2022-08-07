const express = require("express");
const app = express();
const { PORT } = require("./config/config");
const http = require("http").createServer(app);
const connectDB = require("./config/mongoose");
const path = require("path");
const auth = require("./middlewares/auth");
const stripeRouter = require("./stripe.js");
const routes = require("./routes");
require("dotenv").config();
require("./config/express")(app);
require("./config/mongoose");

app.use(express.json());
app.use(auth());
connectDB();

app.use(routes);

  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "./client/build/index.html"))
  })



http.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}...`)
);
