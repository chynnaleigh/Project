import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../utils/contexts/AuthContext";
import { Box, Container, Grid } from "@mui/material";

import beeFlower from "../images/bee-flower.svg";
import ChallengeCard from "../components/ChallengeCard";
import WeeklyProgressCard from "../components/progress/WeeklyProgressCard";
import WeeklyModal from "../components/moods/WeeklyModal";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const {
        username,
        setUsername,
        setEmail,
        currentChallenge,
        setCurrentChallenge,
        previousChallenge,
        setPreviousChallenge,
        setPreviousChallengeStatuses,
        setIsLoggedIn,
    } = useAuth();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("Inside useEffect in Home");
        const verifyCookie = async () => {
            console.log("Token not found, navigating to /auth");
            if (
                !cookies.token ||
                cookies.token === "undefined" ||
                cookies === "false"
            ) {
                removeCookie("token"), navigate("/auth");
                console.log("cookies.token are falsy");
                return;
            }
            console.log("cookies.token", cookies.token);
            const { data } = await axios.post(
                "https://sustainabeebackend.onrender.com/",
                {},
                { withCredentials: true }
            );
            console.log(data);
            const {
                status,
                email,
                user,
                currentChallenge,
                previousChallenge,
                previousChallengeStatuses,
                isWeeklyStatusComplete,
            } = data;
            setOpen(!isWeeklyStatusComplete); // if weekly status update is not complete, show modal and make user fill out form
            setEmail(email);
            setUsername(user);
            setIsLoggedIn(true);
            setCurrentChallenge(currentChallenge);
            setPreviousChallenge(previousChallenge);
            setPreviousChallengeStatuses(previousChallengeStatuses);
            // return status
            //     ? toast(`Hello ${user}`, {
            //           position: "top-right",
            //       })
            //     : (removeCookie("token"), navigate("/auth"));
            return status ? null : (removeCookie("token"), navigate("/auth"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    return (
        <>
            <Container className="p-9">
                <Grid className="mt-8 " container spacing={4}>
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <div className="flex flex-col items-center ">
                            <div className="bg-white rounded-full p-4 mb-3 w-fit">
                                <Box component="img" src={beeFlower} />
                            </div>

                            <h1 className="text-4xl font-black mb-4">
                                Welcome <span>{"back, " + username + "!"}</span>
                            </h1>
                        </div>
                    </Grid>
                    <Grid item xs={1} />

                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <ChallengeCard currentChallenge={currentChallenge} />
                    </Grid>
                    <Grid item xs={1} />

                    <WeeklyModal
                        open={open}
                        setOpen={setOpen}
                        previousChallenge={previousChallenge}
                    />

                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <WeeklyProgressCard />
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
            </Container>

            {/* <ToastContainer /> */}
        </>
    );
};

export default Home;
