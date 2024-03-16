import { useNavigate, useParams } from "react-router-dom";
import { Grid, Box, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import saveThePlanet from "../images/save-the-planet.svg";
import LoginCard from "../components/authCards/LoginCard";
import SignupCard from "../components/authCards/SignupCard";
import { useAuth } from "../utils/contexts/AuthContext";

const Auth = () => {
    const { authPage, setAuthPage } = useAuth();

    const togglePage = () => {
        const newPage = authPage === "login" ? "signup" : "login";
        setAuthPage(newPage);
    };

    // useEffect(() => {}, [authPage]);

    return (
        <div className="flex items-center h-[calc(100vh-80px)] sm:h-screen md:h-[calc(100vh-80px)] ">
            <Grid container spacing={4}>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    className="flex justify-center"
                >
                    <Box
                        component="img"
                        alt="River Environment Image"
                        title="River Environment Image"
                        src={saveThePlanet}
                        className="h-32 sm:h-full"
                    ></Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} alignSelf="center">
                    {authPage === "login" ? (
                        <LoginCard togglePage={togglePage} />
                    ) : (
                        <SignupCard togglePage={togglePage} />
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default Auth;
