const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
		if (password.length < 6)
			return res.status(400).json({
				errorMessage: "Password must be at least 6 characters long",
			});

		// if password and passwordVerify don't match
		if (password !== passwordVerify)
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

		// Before hashing a password, we apply a salt. A salt is a random string that makes the hash unpredictable. Bcrypt is a popular and trusted method for salt and hashing passwords. You have learned how to use bcrypt's NodeJS library to salt and hash a password before storing it in a database.

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		// save the user in the database

		// create a new object.  if the key and value are the same, you can just write the key
		const newUser = new User({
			email,
			passwordHash,
		});

		const savedUser = await newUser.save();

		// create a JWT token
		// JWT is a JSON Web Token. It is a standard for representing claims to be transferred between parties in a secure way.

		// sign the token with a secret key
		const token = jwt.sign(
			{
				id: savedUser._id,
			},
			process.env.JWT_SECRET
		);

		// send the token as a cookie, the httpOnly: true option prevents the token from being read by client-side javascript
		res.cookie("token", token, { httpOnly: true }).send();
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		// validation
		// if missing required fields
		if (!email || !password)
			return res.status(400).json({
				errorMessage: "Missing required fields",
			});

		// get user account
		const existingUser = await User.findOne({ email });
		if (!existingUser)
			return res.status(401).json({
				errorMessage: "Wrong email.",
			});

		// check the password
		const correctPassword = await bcrypt.compare(
			password,
			existingUser.passwordHash
		);

		if (!correctPassword)
			return res.status(401).json({
				errorMessage: "Wrong password.",
			});

		// create a JWT token
		// JWT is a JSON Web Token. It is a standard for representing claims to be transferred between parties in a secure way.

		// sign the token with a secret key
		const token = jwt.sign(
			{
				id: existingUser._id,
			},
			process.env.JWT_SECRET
		);

		// send the token as a cookie, the httpOnly: true option prevents the token from being read by client-side javascript
		res.cookie("token", token, { httpOnly: true }).send();
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/loggedIn", (req, res) => {
	try {
        const token = req.cookies.token;
        if(!token) return res.json(null);

        const validatedUser = jwt.verify(token, process.env.JWT_SECRET);

		res.json(validatedUser.id);
    } catch (error){
        return res.json(null);
    }

});

router.get("/logout", (req, res) => {
	try {
		res.clearCookie("token").send();
	} catch (err) {
		return res.json(null);
	}
} );

module.exports = router;

// destructuring the express and router made the application function more readable.  It also made it easier to test the application.  And when combined it wouldn't work properly.
