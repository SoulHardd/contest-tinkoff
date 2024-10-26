import React, { useState } from "react";
import "./FileInput.css";

export function FileInput({ onUploadComplete }) {
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!file) {
			alert("Пожалуйста, выберите файл формата .txt.");
			return;
		}

		setUploading(true);

		try {
			const response = await fetch("ССЫЛКА НА СЕРВ", {
				method: "POST",
				body: file,
			});

			if (!response.ok) {
				throw new Error(`Ошибка загрузки: ${response.status}`);
			}

			const data = await response.text();
			onUploadComplete(data);

			alert("Файл успешно загружен!");
		} catch (error) {
			alert(`Произошла ошибка при загрузке файла: ${error.message}`);
		} finally {
			setUploading(false);
			setProgress(0);
			setFile(null);
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
						<p>{file.name}</p>
					) : (
						<span className="upload-text">
							Загрузить файл
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
					{uploading ? `Загрузка ${progress}%` : "Обработать"}
				</button>
			</form>
		</div>
	);
}
