import React, { useState, useEffect } from "react";
import { DialogMessage } from "./DialogMessage";

export function DialogBox({ fileContent }) {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (fileContent) {
			parseDialog(fileContent);
		}
	}, [fileContent]);

	const parseDialog = (content) => {
		const lines = content.split("\n"); // Разделяем файл на строки
		const dialogMessages = [];

		lines.forEach((line) => {
			if (line.startsWith("родитель:")) {
				dialogMessages.push({
					speaker: "parent",
					text: line.replace("родитель:", "").trim(),
				});
			} else if (line.startsWith("ребенок:")) {
				dialogMessages.push({
					speaker: "child",
					text: line.replace("ребенок:", "").trim(),
				});
			}
		});

		setMessages(dialogMessages);
	};

	return (
		<div className="dialog-box">
			<div className="dialog-messages">
				{messages.map((msg, index) => (
					<DialogMessage
						key={index}
						speaker={msg.speaker}
						text={msg.text}
					/>
				))}
			</div>
		</div>
	);
}
