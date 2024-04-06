import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../utils/contexts/AuthContext";

import leaf from "../images/leaf.svg";

const TopBar = () => {
    const { username, isLoggedIn, logout } = useAuth();

    useEffect(() => {
        console.log(username);
        console.log(isLoggedIn);
    }, [username, isLoggedIn]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="bg-white mb-4 shadow-none" position="static">
                <Toolbar className="flex justify-between">
                    <Link to="/">
                        <Box component="img" src={leaf} />
                        <Typography className="text-3xl text-black font-black">
                            SustainaBee
                        </Typography>
                    </Link>
                    <div>
                        {isLoggedIn ? (
                            <Link to="/auth">
                                <Button
                                    className="ml-8 text-yellow-600"
                                    color="inherit"
                                    variant="outlined"
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    Logout
                                </Button>
                            </Link>
                        ) : null}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default TopBar;
