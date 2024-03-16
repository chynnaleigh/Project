import { Container, Typography, Box, Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import Bar from "./Bar";
import { useAuth } from "../../utils/contexts/AuthContext";

const WeeklyProgressCard = () => {
    const { previousChallengeStatuses } = useAuth();

    const [weeks, setWeeks] = useState(4);

    const [monthButtonActive, setMonthButtonActive] = useState(true);
    const [threeMonthButtonActive, setThreeMonthButtonActive] = useState(false);
    const [sixMonthButtonActive, setSixMonthButtonActive] = useState(false);
    const [yearButtonActive, setYearButtonActive] = useState(false);

    const handleClick = (event, numberOfWeeks, setActive) => {
        setWeeks(numberOfWeeks);
        if (numberOfWeeks === 4) {
            setMonthButtonActive(true);
            setThreeMonthButtonActive(false);
            setSixMonthButtonActive(false);
            setYearButtonActive(false);
        } else if (numberOfWeeks === 12) {
            setMonthButtonActive(false);
            setThreeMonthButtonActive(true);
            setSixMonthButtonActive(false);
            setYearButtonActive(false);
        } else if (numberOfWeeks === 24) {
            setMonthButtonActive(false);
            setThreeMonthButtonActive(false);
            setSixMonthButtonActive(true);
            setYearButtonActive(false);
        } else {
            setMonthButtonActive(false);
            setThreeMonthButtonActive(false);
            setSixMonthButtonActive(false);
            setYearButtonActive(true);
        }
    };
    const color = (active) => {
        return active ? "bg-sky-200" : "";
    };

    return (
        <>
            <Container
                className="flex flex-col gap-5 p-4 bg-white rounded-3xl h-full"
                component="main"
                style={{ height: "400px" }}
            >
                <div>
                    <Typography className="font-bold text-2xl text-center">
                        Progress
                    </Typography>
                </div>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <Button
                        className={`${color(monthButtonActive)} hue-rotate-30`}
                        onClick={(event) => handleClick(event, 4)}
                    >
                        Past Month
                    </Button>
                    <Button
                        className={`${color(
                            threeMonthButtonActive
                        )} hue-rotate-30`}
                        onClick={(event) => handleClick(event, 12)}
                    >
                        Past 3 Months
                    </Button>
                    <Button
                        className={`${color(
                            sixMonthButtonActive
                        )} hue-rotate-30`}
                        onClick={(event) => handleClick(event, 24)}
                    >
                        Past 6 Months
                    </Button>
                    <Button
                        className={`${color(yearButtonActive)} hue-rotate-30`}
                        onClick={(event) => handleClick(event, 52)}
                    >
                        Past Year
                    </Button>
                </ButtonGroup>
                <div className="flex justify-between items-end border-4 border-gray-100 p-3 rounded h-full">
                    {[...previousChallengeStatuses]
                        .reverse()
                        .filter((_, index) => index < weeks)
                        .map((previousChallenge, j) => (
                            <Bar
                                mood={previousChallenge[0]}
                                challenge={previousChallenge[1]}
                                key={j}
                            ></Bar>
                        ))}
                </div>
                <div className="flex justify-between subpixel-antialiased text-gray-400 mx-0.5 -mt-5">
                    <div>Recent</div>
                    <div>Past</div>
                </div>
            </Container>
        </>
    );
};

export default WeeklyProgressCard;
