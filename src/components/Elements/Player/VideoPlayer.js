import { useState, useRef, useEffect } from "react";
import {
	PlayCircleIcon,
	PauseCircleIcon,
	SpeakerXMarkIcon,
	SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
const VideoPlayer = ({ buttonPosition, source }) => {
	const [videoState, setVideoState] = useState("pause");
	const videoRef = useRef(null);
	const controlVideo = (type) => {
		if (type === "play") {
			videoRef.current.play();
		} else if (type === "mute") {
			videoRef.current.muted = true;
		} else if (type === "unmute") {
			videoRef.current.muted = false;
		} else if (type === "pause") {
			videoRef.current.pause();
		}
	};
	return (
		<div className=" w-full h-full bg-gray-400 relative">
			<video
				ref={videoRef}
				width="1920"
				height="240"
				preload="auto"
				loop
				className="w-full h-full object-cover  z-[-1]"
				src={source}
			>
				Your browser does not support the video tag.
			</video>
			<button
				style={{
					top: buttonPosition.includes("top") ? "20px" : "",
					bottom: buttonPosition.includes("bottom") ? "20px" : "",
					left: buttonPosition.includes("left") ? "20px" : "",
					right: buttonPosition.includes("right") ? "20px" : "",
				}}
				className="absolute"
			>
				{videoState === "pause" ? (
					<PlayCircleIcon
						className="h-8 w-8 text-[#B8B6B7] transform"
						onClick={(e) => {
							e.stopPropagation();
							controlVideo("play");
							setVideoState("play");
						}}
					/>
				) : videoState === "play" ? (
					<SpeakerXMarkIcon
						className="h-8 w-8 text-[#B8B6B7] transform"
						onClick={(e) => {
							e.stopPropagation();
							controlVideo("mute");
							setVideoState("mute");
						}}
					/>
				) : videoState === "mute" ? (
					<SpeakerWaveIcon
						className="h-8 w-8 text-[#B8B6B7] transform"
						onClick={(e) => {
							e.stopPropagation();
							controlVideo("unmute");
							setVideoState("unmute");
						}}
					/>
				) : videoState === "unmute" ? (
					<PauseCircleIcon
						className="h-8 w-8 text-[#B8B6B7] transform"
						onClick={(e) => {
							e.stopPropagation();
							controlVideo("pause");
							setVideoState("pause");
						}}
					/>
				) : (
					<></>
				)}
			</button>
		</div>
	);
};

export default VideoPlayer;
