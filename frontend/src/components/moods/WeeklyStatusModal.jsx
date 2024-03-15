import { Container, Typography, Modal, Button, Box } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

import MoodButton from "./MoodButton";
import { useAuth } from "../../utils/contexts/AuthContext";

import leaf from "../../images/leaf.svg";

const WeeklyStatusModal = ({
    previousChallenge,
    open,
    setOpen,
    handleClose,
}) => {
    const { email } = useAuth();

    const [sadStatus, setSadStatus] = useState(null);
    const [neutralStatus, setNeutralStatus] = useState(null);
    const [happyStatus, setHappyStatus] = useState(null);

    const handleClick = (mood) => {
        if (mood === "sad") {
            setSadStatus("active");
            setNeutralStatus("disabled");
            setHappyStatus("disabled");
        } else if (mood === "neutral") {
            setSadStatus("disabled");
            setNeutralStatus("active");
            setHappyStatus("disabled");
        } else if (mood === "happy") {
            setSadStatus("disabled");
            setNeutralStatus("disabled");
            setHappyStatus("active");
        }
    };

    const handleSubmitProgress = async () => {
        const activeStatus =
            sadStatus === "active"
                ? "notGreat"
                : neutralStatus === "active"
                ? "justOkay"
                : happyStatus === "active"
                ? "great"
                : null;
        console.log("activeStatus", activeStatus);
        try {
            const { data } = await axios.post(
                "http://localhost:4000/weeklyStatus",
                {
                    email: email,
                    weeklyStatus: activeStatus,
                },
                { withCredentials: true }
            );
            console.log(data);
            const { success, previousChallengeStatuses, message } = data;
            if (success) {
                setOpen(false);
                console.log(
                    "previousChallengeStatuses",
                    previousChallengeStatuses
                );
            } else {
                console.error(message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            className="p-24"
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Container
                className="flex flex-col justify-center items-center gap-5 p-2 bg-white rounded-3xl h-full"
                component="main"
            >
                <Typography className="font-semibold text-2xl text-center">
                    How did last week's challenge go?
                </Typography>
                <div className="flex items-center -mb-4">
                    <div className="mr-2 mt-1">
                        <Box component="img" src={leaf} />
                    </div>
                    <Typography className="text-lg font-medium text-center mt-1">
                        {previousChallenge && previousChallenge.title}
                    </Typography>
                </div>

                <Typography className="font-light italic text-slate-700 text-center mb-3">
                    {previousChallenge && previousChallenge.description}
                </Typography>

                <div className="flex justify-center gap-44 m-8">
                    <MoodButton
                        sad
                        handleClick={handleClick}
                        status={sadStatus}
                    />
                    <MoodButton
                        neutral
                        handleClick={handleClick}
                        status={neutralStatus}
                    />
                    <MoodButton
                        happy
                        handleClick={handleClick}
                        status={happyStatus}
                    />
                </div>
                <Button
                    className="bg-yellow-400 text-gray-50 font-sans mt-2 px-4"
                    color="primary"
                    type="submit"
                    size="large"
                    onClick={() => {
                        handleSubmitProgress();
                    }}
                >
                    Submit
                </Button>
            </Container>
        </Modal>
    );
};

export default WeeklyStatusModal;
