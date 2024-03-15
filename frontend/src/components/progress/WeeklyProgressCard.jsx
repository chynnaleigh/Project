import { Container, Typography, Box, Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import Bar from "./Bar";

const WeeklyProgressCard = () => {
    const [weeks, setWeeks] = useState(4);

    const handleClick = (event, numberOfWeeks) => {
        setWeeks(numberOfWeeks);
    };

    return (
        <>
            <Container
                className="flex flex-col gap-5 p-4 bg-white rounded-3xl h-full"
                component="main"
            >
                <div>
                    <Typography className="font-bold text-2xl text-center">
                        Progress
                    </Typography>
                </div>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <Button onClick={(event) => handleClick(event, 4)}>
                        Past Month
                    </Button>
                    <Button onClick={(event) => handleClick(event, 12)}>
                        Past 3 Months
                    </Button>
                    <Button onClick={(event) => handleClick(event, 24)}>
                        Past 6 Months
                    </Button>
                    <Button onClick={(event) => handleClick(event, 52)}>
                        Past Year
                    </Button>
                </ButtonGroup>
                <div className="flex justify-between border-4 border-gray-100 p-3 rounded">
                    {[...Array(weeks)].map((e, i) => (
                        <Bar mood={"great"} key={i}></Bar>
                    ))}
                </div>
            </Container>
        </>
    );
};

export default WeeklyProgressCard;
