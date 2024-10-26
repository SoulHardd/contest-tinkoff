import React from "react";
import "./DialogMessage.css";
import avatarFather from "../../Icons/Father.png";
import avatarDaughter from "../../Icons/Daughter.png";

export function DialogMessage({ speaker, text }) {
	const isParent = speaker === "parent";
	return (
		<div className={`dialog-message ${isParent ? "parent" : "child"}`}>
			<div className="avatar-container">
				<div className="avatar">
					<img
						src={isParent ? avatarFather : avatarDaughter}
						alt="Avatar"
						className="avatar-image"
					/>
				</div>
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
