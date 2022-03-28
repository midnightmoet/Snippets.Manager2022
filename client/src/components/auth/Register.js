import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../navbar/ErrorMessage";
import "./AuthForm.scss";

export default function Register() {
	const [formEmail, setFormEmail] = useState("");
	const [formPassword, setFormPassword] = useState("");
	const [formPasswordVerify, setFormPasswordVerify] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const {getUser} = useContext(UserContext);

	const navigate = useNavigate();

	async function register(e) {
		e.preventDefault();

		const registerData = {
			email: formEmail,
			password: formPassword,
			passwordVerify: formPasswordVerify,
		};

		try {
			await Axios.post("http://localhost:5000/auth/", registerData);
		} catch (err) {
			if (err.response) {
				if (err.response.data.errorMessage) {
					setErrorMessage(err.response.data.errorMessage);
				}
			}
			return;
		}
		
		await getUser();
		navigate("/");
		// "useNavigate()" of React Router Version 6 doesn't have "push()" different from "useHistory()" of React Router Version 5.
	}

	return (
		<div className="auth-form">
			<h2>Register a new account</h2>
			{errorMessage && (
				<ErrorMessage 
					message={errorMessage} 
					clear={() => setErrorMessage(null)} 
				/>
			)}
			<form className="form" onSubmit={register}>
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
				<label htmlFor="form-passwordVerify">Verify password</label>
				<input
					id="form-passwordVerify"
					type="password"
					value={formPasswordVerify}
					onChange={(e) => setFormPasswordVerify(e.target.value)}
				/>
				<button className="btn-submit" type="submit">
					Register
				</button>
				<p>
					Already have an account?
					<Link to="/login">Login</Link>
				</p>
			</form>
		</div>
	);
}

// Link threw an error until I added an import statement to the top of this file.
