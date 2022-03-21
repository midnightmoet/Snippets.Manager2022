import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import Snippets from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import "./Home.scss";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function Home() {
	const [snippets, setSnippets] = useState([]); //unable to call map on undefined so use an empty array
	const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);
	const [editSnippetData, setEditSnippetData] = useState(null);

	const{ user } = useContext(UserContext);

	
	useEffect(() => {
		// if statement returns if there isn't a user logged in & also shows no snippets
		if(!user) setSnippets([]);
		// get snippets from the server
		else getSnippets();
	}, [user]);

	async function getSnippets() {
		const snippetsRes = await Axios.get("http://localhost:5000/snippets/");
		setSnippets(snippetsRes.data);
	}

	function editSnippet(snippetData) {
		setEditSnippetData(snippetData);
		setSnippetEditorOpen(true);
	}

	function renderSnippets() {
		// this part of the code will ensure the newest snippet is at the top of the list.
		let sortedSnippets = [...snippets];
		sortedSnippets = sortedSnippets.sort((a, b) => {
			return new Date(b.createdAt) - new Date(a.createdAt);
		});

		// this will return the snippets with the sorted order of newest first.
		return sortedSnippets.map((snippet, i) => {
			return (
				<Snippets
					key={i}
					snippet={snippet}
					getSnippets={getSnippets}
					editSnippet={editSnippet}
				/>
			);
		});
	}

	return (
		<div className="home">
			{!snippetEditorOpen && user && (
				<button
					className="btn-editor-toggle"
					onClick={() => setSnippetEditorOpen(true)}
				>
					Add snippet
				</button>
			)}
			{snippetEditorOpen && (
				<SnippetEditor
					setSnippetEditorOpen={setSnippetEditorOpen}
					getSnippets={getSnippets}
					editSnippetData={editSnippetData}
				/>
			)}
			{snippets.length > 0 ? (
				renderSnippets()
			) : user && ( 
				<p className="no-snippets-msg">No snippets yet have been created yet.</p>
			)}

			{user === null  && (
				<div className="no-user-message">
					<h2>Welcome to Snippet Manager</h2>
					<Link to="/register">Register here</Link>
				</div>
			)}
		</div>
	);
}
