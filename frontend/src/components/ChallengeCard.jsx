import { Container, Typography, Box } from "@mui/material";
import React from "react";

import leaf from "../images/leaf.svg";

const ChallengeCard = ({ currentChallenge }) => {
    return (
        <>
            <Container
                className="flex flex-col justify-center gap-5 items-center bg-white rounded-3xl h-full p-5"
                component="main"
            >
                <div>
                    <Typography className="text-3xl font-black text-center mt-2">
                        Current Challenge:
                    </Typography>
                    <Typography className="text-lg font-medium text-center mt-1">
                        {currentChallenge && currentChallenge.title}
                    </Typography>
                </div>
                <div className="">
                    <Box component="img" src={leaf} />
                </div>
                <Typography className="font-light text-slate-700 text-center mb-2">
                    {currentChallenge && currentChallenge.description}
                </Typography>
            </Container>
        </>
    );
};

export default ChallengeCard;
