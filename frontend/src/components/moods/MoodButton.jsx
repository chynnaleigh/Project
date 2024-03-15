import React from "react";
import { Typography, Box } from "@mui/material";

import sadFace from "../../images/sad-face.svg";
import neutralFace from "../../images/neutral-face.svg";
import happyFace from "../../images/happy-face.svg";

const MoodButton = ({
    sad = false,
    neutral = false,
    happy = false,
    handleClick,
    status = "default",
}) => {
    const mood = sad ? "sad" : neutral ? "neutral" : happy ? "happy" : "happy";

    const moodMap = {
        sad: ["bg-sky-200", sadFace, "Not Great"],
        neutral: ["bg-slate-200", neutralFace, "Just Okay"],
        happy: ["bg-lime-300", happyFace, "Great"],
    };

    const version =
        status === "active"
            ? "scale-125 drop-shadow-md"
            : status === "disabled"
            ? "grayscale"
            : status === "default"
            ? ""
            : "";

    const fontVersion =
        status === "active"
            ? "font-medium"
            : status === "disabled"
            ? "font-thin"
            : status === "default"
            ? "font-light"
            : "font-light";

    return (
        <div className={`transition ease-in-out ${version}`}>
            <button
                className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300"
                onClick={(event) => {
                    handleClick(mood);
                }}
            >
                <div
                    className={`${moodMap[mood][0]} rounded-full p-4 transition ease-in-out delay-100 hover:drop-shadow-md`}
                >
                    <Box component="img" src={`${moodMap[mood][1]}`} />
                </div>
                <Typography className={`${fontVersion} text-center mt-2`}>
                    {moodMap[mood][2]}
                </Typography>
            </button>
        </div>
    );
};

export default MoodButton;
