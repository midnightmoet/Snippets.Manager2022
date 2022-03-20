import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";


export default function Router() {
	return (
		<BrowserRouter>
            <Navbar/>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}
