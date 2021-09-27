const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
const cors = require("cors")
const postsRoute = require("./routers/posts");
app.use(bodyParser.json());
app.use(cors());
app.use("/posts", postsRoute);

//Connect to db
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("conected to DB");
});
// start

app.listen(3001);