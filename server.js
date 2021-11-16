// app setup
const express = require("express");
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");

// routes
const router = require("./routes");
app.use("/", router);

// start app
app.listen(3000);
