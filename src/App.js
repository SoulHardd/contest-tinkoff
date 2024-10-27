import React, { useState } from "react";
import { FileInput } from "./Components/Inputs/FileInput";
import { DialogBox } from "./Components/Dialog/DialogBox";
import "./App.css";
import LinkInput from "./Components/Inputs/LinkInput";
import { Header } from "./Components/Header/Header";

function App() {
	const [dataContent, setDataContent] = useState(null);

	const handleDataLoad = (content) => {
		setDataContent(content);
	};

	return (
		<div className="App">
      <Header/>
			{!dataContent && <FileInput onFileLoad={handleDataLoad} />}
			{dataContent && <DialogBox fileContent={dataContent} />}
			{!dataContent && <LinkInput onLinkLoad={handleDataLoad} />}
		</div>
	);
}

export default App;
