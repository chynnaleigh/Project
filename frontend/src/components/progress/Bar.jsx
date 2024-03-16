import React, { useState } from "react";
import { Popover, Typography } from "@mui/material";

const Bar = ({ mood, challenge }) => {
    const moodColourMap = {
        notGreat: "bg-sky-200",
        justOkay: "bg-slate-200",
        great: "bg-lime-300",
    };

    const [anchorPreviousEl, setAnchorPreviousEl] = useState(null);

    const handlePreviousPopoverOpen = (event) => {
        setAnchorPreviousEl(event.currentTarget);
    };

    const handlePreviousPopoverClose = () => {
        setAnchorPreviousEl(null);
    };

    const openPrevious = Boolean(anchorPreviousEl);

    return (
        <>
            <div
                className={`h-5/6 w-1.5 ${moodColourMap[mood]} rounded`}
                onMouseEnter={handlePreviousPopoverOpen}
                onMouseLeave={handlePreviousPopoverClose}
            ></div>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: "none",
                }}
                open={openPrevious}
                anchorEl={anchorPreviousEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                onClose={handlePreviousPopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }}>
                    <strong>{challenge && challenge.title}</strong>
                </Typography>
                <Typography sx={{ p: 1 }}>
                    <i>{challenge && challenge.description}</i>
                </Typography>
            </Popover>
        </>
    );
};

export default Bar;
