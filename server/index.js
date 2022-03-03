const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// set up an express server

const app = express();

// JSON body parser
app.use(express.json());
// CORS is middleware that allows us to accept requests from other origins
app.use(
    cors({ 
        origin: "http://localhost:3000", 
    })
);

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
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) return console.log(err);
		console.log("Connected to Mongodb");
	}
);
