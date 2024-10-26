import React, { useState, useEffect } from "react";
import { DialogMessage } from "./DialogMessage";
import "./DialogBox.css";

export function DialogBox({ fileContent }) {
	const [messages, setMessages] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

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

		content = content.replace(/[\t\n]/g, ' ');

		let match;
		while ((match = parentRegex.exec(content)) !== null) {
			parentMatches.push({
				speaker: "parent",
				text: match[1].replace("Отец:", "").trim(),
			});
		}

		while ((match = childRegex.exec(content)) !== null) {
			childMatches.push({
				speaker: "child",
				text: match[1].replace("Дочка:", "").trim(),
			});
		}

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
		startDisplayingMessages(dialogMessages);
	};

	const startDisplayingMessages = (dialogMessages) => {
		let index = 0;

		const interval = setInterval(() => {
			if (index < dialogMessages.length) {
				setCurrentIndex((prev) => prev + 1);
				index++;
			} else {
				clearInterval(interval);
			}
		}, 2000);
	};

	return (
		<div className="dialog-box">
			<div className="dialog-messages">
				{messages.slice(0, currentIndex).map((msg, index) => (
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