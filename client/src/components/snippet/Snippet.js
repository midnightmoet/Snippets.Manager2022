import React from "react";
import Axios from "axios";
import "./Snippet.scss";

// destructure props into snippet, then no need for the excess addition of props on everything lol.
export default function Snippets({ snippet, getSnippets, editSnippet }) {

	async function deleteSnippet(){
		await Axios.delete(`http://localhost:5000/snippets/${snippet._id}`);

		getSnippets();
	}



	return (
		<div className="snippet">
			{snippet.title && <h2 className="title">{snippet.title}</h2>}
			{snippet.description && <p className="description">{snippet.description}</p>}
			{snippet.code && (
				<pre className="code">
					<code>{snippet.code}</code>
				</pre>
			)}
			<button className="btn-edit" onClick={() => editSnippet(snippet)}>Edit</button>
			<button className="btn-delete" onClick={deleteSnippet}>Delete</button>
		</div>
	);
}
