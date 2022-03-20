import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./AuthForm.scss";

export default function Login() {
	const [formEmail, setFormEmail] = useState("");
	const [formPassword, setFormPassword] = useState("");

	async function login(e) {
		e.preventDefault();

		const loginData = {
			email: formEmail,
			password: formPassword,
		};

		await Axios.post("http://localhost:5000/auth/login", loginData);
	}

	return (
		<div className="auth-form">
			<h2>Login</h2>
			<form className="form" onSubmit={login}>
				<label htmlFor="form-email">Email</label>
				<input
					id="form-email"
					type="email"
					value={formEmail}
					onChange={(e) => setFormEmail(e.target.value)}
				/>
				<label htmlFor="form-password">Password</label>
				<input
					id="form-password"
					type="password"
					value={formPassword}
					onChange={(e) => setFormPassword(e.target.value)}
				/>
				<button className="btn-submit" type="submit">
					Log in
				</button>
				<p>
					Don't have an account?
					<Link to="/register">Register here</Link>
				</p>
			</form>
		</div>
	);
}

// Link threw an error until I added an import statement to the top of this file.
