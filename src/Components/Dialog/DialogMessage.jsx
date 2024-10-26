import React from "react";
import "./DialogMessage.css"

export function DialogMessage({ speaker, text }) {
	const isParent = speaker === "parent";
	return (
		<div className={`dialog-message ${isParent ? "parent" : "child"}`}>
			<div className="avatar-container">
				<div className="avatar">{/*АВАТАРКА */}</div>
			</div>

			<div className="message-container">
				<div
					className={`message ${
						isParent ? "parent-message" : "child-message"
					}`}
				>
					{text} 
				</div>
			</div>
		</div>
	);
}
