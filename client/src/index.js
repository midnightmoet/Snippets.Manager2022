import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function App() {
	const [time, setTime] = useState(new Date().toLocaleTimeString());
	
    useEffect(() => {
        setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    }, []);

	return (
		<div>
			<Clock time={time} />
		</div>
	);
}

function Clock(props) {
	return <p>It's currently {props.time}</p>;
}

ReactDOM.render(<App />, document.getElementById("root"));
