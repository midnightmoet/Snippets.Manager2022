import React from "react";
import Axios from "axios";

// destructure props into snippet, then no need for the excess addition of props on everything lol.
export default function Snippets({ snippet, getSnippets, editSnippet }) {

	async function deleteSnippet(){
		await Axios.delete(`http://localhost:5000/snippets/${snippet._id}`);

		getSnippets();
	}



	return (
		<div className="snippet">
			{snippet.title && <h2>{snippet.title}</h2>}
			{snippet.description && <p>{snippet.description}</p>}
			{snippet.code && (
				<pre>
					<code>{snippet.code}</code>
				</pre>
			)}
			<button onClick={() => editSnippet(snippet)}>Edit</button>
			<button onClick={deleteSnippet}>Delete</button>
		</div>
	);
}