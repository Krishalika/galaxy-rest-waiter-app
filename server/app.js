const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const mongoUri =
  "mongodb+srv://admin:admin@my-cluster.8a3z5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//make a default route
app.get("/", (req, res) => {
  res.send("welcome to node js");
});

app.listen(3000, () => {
  console.log("server running");
});
