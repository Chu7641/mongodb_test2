const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
const cors = require("cors");
const postsRoute = require("./routers/posts");
const usersRoute = require("./routers/user");
app.use(bodyParser.json());
app.use(cors());
app.use("/posts", postsRoute);
app.use("/api/users",usersRoute);
//Connect to db
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("conected to DB");
});

app.listen(process.env.PORT || 3001);
