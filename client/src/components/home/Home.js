import React, { useEffect, useState } from 'react'
import Axios from 'axios';

export default function Home() {
	const [snippets, setSnippets] = useState([]);

	useEffect(() => {
		// get snippets from the server
		getSnippets();
	}, []);

	async function getSnippets(){
		const snippetsRes = await Axios.get("http://localhost:5000/snippets/");
		console.log(snippetsRes);
	}

  	return (
		<div className="home">
			Home
		</div>
  	)
}
