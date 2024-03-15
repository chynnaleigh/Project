import React from "react";

const Bar = ({ mood }) => {
    const moodColourMap = {
        notGreat: "bg-sky-200",
        justOkay: "bg-slate-200",
        great: "bg-lime-300",
    };
    return <div className={`h-20 w-1.5 ${moodColourMap[mood]} rounded`}></div>;
};

export default Bar;
