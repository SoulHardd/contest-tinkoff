import React, { useState } from "react";
import axios from "axios";
import "./LinkInput.css";
import ArrowIcon from "../../Icons/SendArrow.png";

const LinkInput = ({ onLinkLoad }) => {
	const [url, setUrl] = useState("");
	const [uploading, setUploading] = useState(false);

	const handleInputChange = (e) => {
		const selectedUrl = e.target.files[0];
		console.log(selectedUrl);
		setUrl(selectedUrl);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setUploading(true);
		const formData = new FormData();
		formData.append("url", url);

		try {
			const res = await axios.post("http://localhost:3001/", formData);

			console.log("Server response:", res.data);
			if (onLinkLoad) onLinkLoad(res.data);
		} catch (err) {
			console.error(err);
		} finally {
			setUploading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="link-input">
			<input
				type="text"
				value={url}
				onChange={handleInputChange}
				className="link-input"
				placeholder="Вставьте ссылку"
			/>
			<button
				type="submit"
				className="submit-button"
				disabled={uploading}
			>
				<img src={ArrowIcon} alt="Upload" />
			</button>
		</form>
	);
};

export default LinkInput;
