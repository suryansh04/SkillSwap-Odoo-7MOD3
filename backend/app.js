const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

module.exports = app;
