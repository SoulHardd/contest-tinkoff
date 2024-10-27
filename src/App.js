import React, { useState } from "react";
import { FileInput } from "./Components/FileInput";
import { DialogBox } from "./Components/Dialog/DialogBox";
import "./App.css";
import LinkInput from "./Components/LinkInput";


function App() {
	const [dataContent, setDataContent] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleDataLoad = (content) => {
		setLoading(true);
		setDataContent(content);
		setLoading(false);
	};

	return (
		<div className="App">
			{loading ? (
				<div className="loader">
					Загрузка данных... Пожалуйста, подождите...
				</div>
			) : (
				<>
					{!dataContent && <FileInput onFileLoad={handleDataLoad} />}
					{dataContent && <DialogBox fileContent={dataContent} />}
          {!dataContent && <LinkInput onLinkLoad={handleDataLoad} />}
				</>
			)}
		</div>
	);
}

export default App;
