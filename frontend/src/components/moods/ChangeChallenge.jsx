import { Typography, Button, Box, Popover } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

import { useAuth } from "../../utils/contexts/AuthContext";

import leaf from "../../images/leaf.svg";

const ChangeChallenge = ({ setOpen }) => {
    const { email, previousChallenge, currentChallenge, setCurrentChallenge } =
        useAuth();

    const [anchorPreviousEl, setAnchorPreviousEl] = useState(null);

    const handlePreviousPopoverOpen = (event) => {
        setAnchorPreviousEl(event.currentTarget);
    };

    const handlePreviousPopoverClose = () => {
        setAnchorPreviousEl(null);
    };

    const openPrevious = Boolean(anchorPreviousEl);

    const [anchorNewEl, setAnchorNewEl] = useState(null);

    const handleNewPopoverOpen = (event) => {
        setAnchorNewEl(event.currentTarget);
    };

    const handleNewPopoverClose = () => {
        setAnchorNewEl(null);
    };

    const openNew = Boolean(anchorNewEl);

    const handleSubmitProgress = async (challenge) => {
        try {
            const { data } = await axios.post(
                "https://sustainabeebackend.onrender.com/changeChallenge",
                {
                    email: email,
                    currentChallenge: challenge,
                },
                { withCredentials: true }
            );
            console.log(data);
            const { success, message } = data;
            if (success) {
                setCurrentChallenge(challenge);
                setOpen(false);
            } else {
                console.error(message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center gap-24 w-full">
            <div className="flex flex-col items-center">
                <div className="mr-2 mt-1 scale-150">
                    <Box component="img" src={leaf} />
                </div>
                <Typography className="font-semibold text-2xl text-center w-7/12 mt-6">
                    Do you want to stay with the previous challenge or accept
                    the new challenge?
                </Typography>
            </div>

            <div className="flex gap-10 w-11/12">
                <Button
                    className="basis-1/2 bg-sky-200 text-black font-sans mt-2 p-4 hover:brightness-105 ease-in-out"
                    color="primary"
                    type="submit"
                    size="large"
                    onClick={() => {
                        handleSubmitProgress(previousChallenge);
                    }}
                    onMouseEnter={handlePreviousPopoverOpen}
                    onMouseLeave={handlePreviousPopoverClose}
                >
                    <strong className="mr-2">{"Previous Challenge:"}</strong>
                    {previousChallenge && previousChallenge.title}
                </Button>
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
                        horizontal: "left",
                    }}
                    onClose={handlePreviousPopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>
                        {previousChallenge && previousChallenge.description}
                    </Typography>
                </Popover>
                <Button
                    className="basis-1/2 bg-yellow-400 text-black font-sans mt-2 p-4 hover:brightness-105 ease-in-out"
                    color="primary"
                    type="submit"
                    size="large"
                    onClick={() => {
                        handleSubmitProgress(currentChallenge);
                    }}
                    onMouseEnter={handleNewPopoverOpen}
                    onMouseLeave={handleNewPopoverClose}
                >
                    <strong className="mr-2">{"New Challenge:"}</strong>
                    {currentChallenge && currentChallenge.title}
                </Button>
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: "none",
                    }}
                    open={openNew}
                    anchorEl={anchorNewEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    onClose={handleNewPopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>
                        {currentChallenge && currentChallenge.description}
                    </Typography>
                </Popover>
            </div>
        </div>
    );
};

export default ChangeChallenge;
