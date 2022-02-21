const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// set up an express server

const app = express();

// JSON body parser
app.use(express.json());

app.listen(5000, () => {
    console.log("Server started on port 5000");
});

// Set up routers
// app.use adds middleware to the express server
app.use("/snippets", require("./routers/snippetRouter"));

// connect to mongodb
mongoose.connect(
    process.env.MDB_CONNECT_STRING,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) return console.log(err);
    console.log("Connected to Mongodb");
});