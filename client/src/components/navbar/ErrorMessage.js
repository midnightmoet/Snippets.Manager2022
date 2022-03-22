import React from 'react';

export default function ErrorMessage({message, clear}) {
  return (
    <div className="error-message">
        <p>{message}</p>
        <button onClick={clear}>Clear</button>
    </div>
  );
}
