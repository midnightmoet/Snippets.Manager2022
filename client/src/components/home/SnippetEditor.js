import React, {useState, useEffect} from "react";
import Axios from "axios";

export default function SnippetEditor({getSnippets, setSnippetEditorOpen, editSnippetData}) {
	const [editorTitle, setEditorTitle] = useState("");
	const [editorDesc, setEditorDesc] = useState("");
	const [editorCode, setEditorCode] = useState("");

	useEffect(() => {
		if (editSnippetData) {
			setEditorTitle(editSnippetData.title ? editSnippetData.title : "");
			setEditorDesc(editSnippetData.description ? editSnippetData.description : "");
			setEditorCode(editSnippetData.code ? editSnippetData.code : "");
		}
	}, [editSnippetData]);
	
    async function saveSnippet(e){
		e.preventDefault();

		const snippetData = {
			// use a ternary to check if the title/desc/code is empty and set it to undefined if it is
			title: editorTitle ? editorTitle : undefined,
			description: editorDesc ? editorDesc : undefined,
			code: editorCode ? editorCode : undefined
		}

		await Axios.post("http://localhost:5000/snippets/", snippetData);

		getSnippets();
		closeEditor();

	}

	// this function will close the editor and reset the state
	function closeEditor(){
		setEditorTitle("");
		setEditorDesc("");
		setEditorCode("");
		setSnippetEditorOpen(false);
	}
    
	return (
		<div className="snippet-editor">
			<form onSubmit={saveSnippet}>
				<label htmlFor="editor-title">Title</label>
				<input
					id="editor-title"
					type="text"
					placeholder="Title"
					value={editorTitle}
					onChange={(e) => setEditorTitle(e.target.value)}
				/>

				<label htmlFor="editor-desc">Description</label>
				<input
					id="editor-desc"
					type="text"
					placeholder="Description"
					value={editorDesc}
					onChange={(e) => setEditorDesc(e.target.value)}
				/>

				<label htmlFor="editor-code">Code</label>
				<textarea
					id="editor-code"
					placeholder="Code"
					value={editorCode}
					onChange={(e) => setEditorCode(e.target.value)}
				/>
				<button type="submit">Save snippet</button>
				<button type="button" onClick={closeEditor}>
					Cancel
				</button>
			</form>
		</div>
	);
}
