import React, { useState, useEffect } from "react";
import { DialogMessage } from "./DialogMessage";
import "./DialogBox.css"

export function DialogBox({ fileContent }) {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (fileContent) {
			parseDialog(fileContent);
		}
	}, [fileContent]);

	const parseDialog = (content) => {
		const dialogMessages = [];
		const parentRegex = /(Отец:.*?)(?=(?:\n|$)|Дочка:|Отец:)/g;
		const childRegex = /Дочка:(.*?)(?=(?:\n|$)|Отец:|Дочка:)/g;

		let parentMatches = [];
		let childMatches = [];

		// Получаем все сообщения родителей
		let match;
		while ((match = parentRegex.exec(content)) !== null) {
			parentMatches.push({
				speaker: "parent",
				text: match[1].replace("Отец:", "").trim(),
			});
		}

		// Получаем все сообщения детей
		while ((match = childRegex.exec(content)) !== null) {
			childMatches.push({
				speaker: "child",
				text: match[1].replace("Дочка:", "").trim(),
			});
		}

		// Чередуем сообщения родителей и детей
		const maxLength = Math.max(parentMatches.length, childMatches.length);
		for (let i = 0; i < maxLength; i++) {
			if (i < childMatches.length) {
				dialogMessages.push(childMatches[i]);
			}
			if (i < parentMatches.length) {
				dialogMessages.push(parentMatches[i]);
			}
		}

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