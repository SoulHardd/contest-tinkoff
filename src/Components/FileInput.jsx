import React, { useState, useRef } from "react";
import axios from "axios";
import "./FileInput.css";
import image from "../Icons/LoadArrow.png";

export function FileInput({ onUploadComplete }) {
 const [file, setFile] = useState("");
 const [data, setData] = useState({ name: "", path: "" });
 const [progress, setProgress] = useState(0);
 const [uploading, setUploading] = useState(false); // added for upload state
 const el = useRef();

 const handleFileChange = (e) => {
  setProgress(0);
  const selectedFile = e.target.files[0];
  console.log(selectedFile);
  setFile(selectedFile);
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setUploading(true); // start upload state
  const formData = new FormData();
  formData.append("file", file);

  try {
   const res = await axios.post("http://localhost:3001/", formData, {
    onUploadProgress: (ProgressEvent) => {
     const percentCompleted = Math.round(
      (ProgressEvent.loaded * 100) / ProgressEvent.total
     );
     setProgress(percentCompleted);
    },
   });

   console.log(res);
   setData({
    name: res.data.name,
    path: "http://localhost:3001" + res.data.path,
   });
   if (onUploadComplete) onUploadComplete(res.data);
  } catch (err) {
   console.error(err);
  } finally {
   setUploading(false); // end upload state
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
                            <img src={image} alt="" className="upload-image"/>
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
