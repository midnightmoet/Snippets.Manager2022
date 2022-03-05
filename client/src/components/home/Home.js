import React, { useEffect, useState } from "react";
import Axios from "axios";
import Snippets from "../snippet/Snippet";
import SnippetEditor from "./SnippetEditor";

export default function Home() {
	const [snippets, setSnippets] = useState([]); //unable to call map on undefined so use an empty array
	const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);
	const [editSnippetData, setEditSnippetData] = useState(null);

	useEffect(() => {
		// get snippets from the server
		getSnippets();
	}, []);

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
			{!snippetEditorOpen && (
				<button onClick={() => setSnippetEditorOpen(true)}>
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
			{renderSnippets()}
		</div>
	);
}
