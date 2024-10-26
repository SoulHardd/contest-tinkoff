import React, { useRef, useState, useEffect } from "react";
import "./AudioPlayer.css"; // Импортируем стили

export function AudioPlayer({ audioUrl }) {
	const audioRef = useRef(new Audio(audioUrl));
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		audioRef.current.src = audioUrl;
		audioRef.current.load();

		const durationChangeHandler = () => {
			setDuration(audioRef.current.duration);
		};

		const timeUpdateHandler = () => {
			setCurrentTime(audioRef.current.currentTime);
		};

		audioRef.current.addEventListener(
			"loadedmetadata",
			durationChangeHandler
		);
		audioRef.current.addEventListener("timeupdate", timeUpdateHandler);

		return () => {
			audioRef.current.removeEventListener(
				"loadedmetadata",
				durationChangeHandler
			);
			audioRef.current.removeEventListener(
				"timeupdate",
				timeUpdateHandler
			);
		};
	}, [audioUrl]);

	const togglePlayPause = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	return (
		<div className="audio-player">
			<button onClick={togglePlayPause} className="play-pause-btn">
				{isPlaying ? (
					<span className="icon pause-icon">||</span>
				) : (
					<span className="icon play-icon">&#9654;</span>
				)}
			</button>
			<div className="progress-bar">
				<div
					className="progress"
					style={{ width: `${(currentTime / duration) * 100}%` }}
				/>
			</div>
			<span className="time-display">
				{isPlaying ? formatTime(currentTime) : formatTime(duration)}
			</span>
		</div>
	);
}
