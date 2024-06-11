require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const UrlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const UserRoute = require("./routes/user");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");

const app = express();
const PORT = 5005;

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoUri = process.env.MONGODB_URI;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error, "Error Occured");
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictToLoggedInUserOnly, UrlRoute);
app.use("/user", UserRoute);
app.use("/", checkAuth, staticRoute);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
