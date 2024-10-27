import React, { useState, useRef } from "react";
import axios from "axios";
import "./FileInput.css";
import image from "../../Icons/LoadArrow.png";

export function FileInput({ onFileLoad }) {
	const [file, setFile] = useState("");
	const [uploading, setUploading] = useState(false);
	const el = useRef();

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		console.log(selectedFile);
		setFile(selectedFile);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setUploading(true);
		const formData = new FormData();
		formData.append("file", file);

		try {
			const res = await axios.post("http://localhost:3001/", formData);

			console.log("Server response:", res.data);
			if (onFileLoad) onFileLoad(res.data);
		} catch (err) {
			console.error(err);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="file-input-container">
			<form onSubmit={handleSubmit} className="upload-form">
				<div
					className="drop-area"
					onClick={() =>
						document.getElementById("file-input").click()
					}
					style={{ cursor: "pointer" }}
				>
					{file ? (
						<span className="upload-text">{file.name}</span>
					) : (
						<span className="upload-text">
							Загрузить файл
							<img src={image} alt="" className="upload-image" />
						</span>
					)}
					<input
						type="file"
						accept=".txt"
						onChange={handleFileChange}
						id="file-input"
						style={{ display: "none" }}
					/>
				</div>
				<button
					type="submit"
					disabled={uploading}
					className="upload-button"
				>
					{uploading ? "Обработка..." : "Обработать"}
				</button>
			</form>
		</div>
	);
}
