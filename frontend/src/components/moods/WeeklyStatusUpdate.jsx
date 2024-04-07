import { Typography, Button, Box } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

import MoodButton from "./MoodButton";
import { useAuth } from "../../utils/contexts/AuthContext";

import leaf from "../../images/leaf.svg";

const WeeklyStatusUpdate = ({ setWeeklyStatusUpdate }) => {
    const { email, previousChallenge, setPreviousChallengeStatuses } =
        useAuth();

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
                "https://sustainabeebackend.onrender.com/weeklyStatus",
                {
                    email: email,
                    weeklyStatus: activeStatus,
                    previousChallenge: previousChallenge,
                },
                { withCredentials: true }
            );
            console.log(data);
            const { success, previousChallengeStatuses, message } = data;
            if (success) {
                setWeeklyStatusUpdate(false);
                setPreviousChallengeStatuses(previousChallengeStatuses);
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
        <>
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
                <MoodButton sad handleClick={handleClick} status={sadStatus} />
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
        </>
    );
};

export default WeeklyStatusUpdate;
