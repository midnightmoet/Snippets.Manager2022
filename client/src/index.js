import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function App() {

	const [messageShown, setMessageShown] = useState(false);

	// Generic update 
	useEffect(() => {
		console.log("Component updating...");
	});


// Specific update
	useEffect(() => {
		console.log("Specific state update!");
	}, [messageShown])

	return (
		<>
			
			<button onClick={() => setMessageShown(!messageShown)}>
				Toggle Message
			</button>
			{messageShown &&( 
				<>
					<Random />
					<p>Some message</p>
				</>
			)}
		</>
	);
}

function Random(){
	const [randomNumber, setRandomNumber] = useState(Math.random());

	useEffect(() => {
		console.log("Component mount!");
		const intervalId = setInterval(() => {
			setRandomNumber(Math.random());
			console.log("Setting new random number...");
		}, 1000);

		// cleanup function
		return () => {
			console.log("Component unmount!");
			clearInterval(intervalId);
		};
	}, []);

	return <h1>{randomNumber}</h1>;
}

ReactDOM.render(<App />, document.getElementById("root"));
