import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../utils/contexts/AuthContext";
import { Box, Grid } from "@mui/material";

import beeFlower from "../images/bee-flower.svg";
import ChallengeCard from "../components/ChallengeCard";
import WeeklyProgressCard from "../components/progress/WeeklyProgressCard";
import WeeklyStatusModal from "../components/moods/WeeklyStatusModal";

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
        setIsLoggedIn,
    } = useAuth();

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        //setOpen(false);
    };

    useEffect(() => {
        console.log("Inside useEffect in Home");
        const verifyCookie = async () => {
            console.log("Token not found, navigating to /auth");
            if (!cookies.token) {
                navigate("/auth");
            }
            const { data } = await axios.post(
                "http://localhost:4000",
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
                isWeeklyStatusComplete,
            } = data;
            setOpen(!isWeeklyStatusComplete); // if weekly status update is not complete, show modal and make user fill out form
            setEmail(email);
            setUsername(user);
            setIsLoggedIn(true);
            setCurrentChallenge(currentChallenge);
            setPreviousChallenge(previousChallenge);
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
            <Grid className="mt-8" container spacing={4}>
                <Grid item xs={1} />
                <Grid item xs={4}>
                    <div className="flex flex-col items-center">
                        <div className="bg-white rounded-full p-4 mb-3 w-fit">
                            <Box component="img" src={beeFlower} />
                        </div>

                        <h1 className="text-4xl font-black">
                            Welcome <span>{"back, " + username + "!"}</span>
                        </h1>
                    </div>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={4}>
                    <ChallengeCard currentChallenge={currentChallenge} />
                </Grid>
                <Grid item xs={1} />

                <WeeklyStatusModal
                    open={open}
                    setOpen={setOpen}
                    handleClose={handleClose}
                    previousChallenge={previousChallenge}
                />

                <Grid item xs={1} />
                <Grid item xs={10}>
                    <WeeklyProgressCard />
                </Grid>
                <Grid item xs={1} />
            </Grid>

            {/* <ToastContainer /> */}
        </>
    );
};

export default Home;
