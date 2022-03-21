import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Navbar.scss";

export default function Navbar() {
	const { user, getUser } = useContext(UserContext);

	async function logOut() {
		await Axios.get("http://localhost:5000/auth/logOut");
		await getUser();
	}

	return (
		<div className="navbar">
			<Link to="/">
				<h1>Snippet manager</h1>
			</Link>
			{user === null ? (
        <div>
					<Link to="/login">Log in</Link>
					<Link to="/register">Register</Link>
				</div>
      ) : (
        user && <button className="btn-logout" onClick={logOut}>Log out</button>
      )}
		</div>
	);
}
