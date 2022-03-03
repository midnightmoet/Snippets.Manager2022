import React from "react";

export default function Snippets({ snippet }) {
	return (
		<div className="snippet">
			{snippet.title && <h2>{snippet.title}</h2>}
			{snippet.description && <p>{snippet.description}</p>}
			{snippet.code && (
				<pre>
					<code>{snippet.code}</code>
				</pre>
			)}
		</div>
	);
}
