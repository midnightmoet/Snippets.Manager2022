const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
	try {
		const { email, password, passwordVerify } = req.body;

		// validation
		// if missing required fields
		if (!email || !password || !passwordVerify) 
			return res.status(400).json({
				errorMessage: "Missing required fields",
			});
		

		// if password is shorter than 6 characters
		if(password.length < 6) 
			return res.status(400).json({
				errorMessage: "Password must be at least 6 characters long",
			});
		

		// if password and passwordVerify don't match
		if(password !== passwordVerify) 
			return res.status(400).json({
				errorMessage: "Passwords must match",
			});
		

		// make sure no account exists for this email
		const existingUser = await User.findOne({ email });
		if (existingUser) 
			return res.status(400).json({
				errorMessage: "Account with this email already exists",
			});
		

		// hash the password, for this you npm i bcryptjs in the terminal
		



	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;

// destructuring the express and router made the application function more readable.  It also made it easier to test the application.  And when combined it wouldn't work properly.
