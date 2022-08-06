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
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static(path.resolve(_dirname )));
  app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, "index.html"));
  });
}

http.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}...`)
);
