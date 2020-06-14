const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
var cors = require('cors')
var app = express()
 
app.use(cors())

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Requiring our routes
require("./routes/html-routes.js")(app);
// require("./routes/excercise-routes")(app);
require("./routes/workoutPlan-routes")(app);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:28017/workouttracker",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
