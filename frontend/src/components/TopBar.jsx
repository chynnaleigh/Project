import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import {
    Button,
    IconButton,
    AppBar,
    Box,
    Toolbar,
    Typography,
} from "@mui/material";
import { useAuth } from "../utils/contexts/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const TopBar = () => {
    const { setAuthPage, username, isLoggedIn, setIsLoggedIn, logout } =
        useAuth();
    const pages = [{ pageName: "About", link: "/about" }];

    const [profileMenuAnchor, setProfileMenuAnchor] = useState(null); // State variable for the anchor element

    const handleProfileMenuClick = (event) => {
        setProfileMenuAnchor(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileMenuAnchor(null);
    };

    useEffect(() => {
        console.log(username);
        console.log(isLoggedIn);
    }, [username, isLoggedIn]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="bg-white mb-4 shadow-none" position="static">
                <Toolbar className="flex justify-between">
                    <Link to="/">
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
                        ) : // <>
                        //     {pages.map((page) => (
                        //         <Link key={page} to={page.link}>
                        //             <Button
                        //                 className="text-black capitalize"
                        //                 key={page}
                        //                 variant="text"
                        //             >
                        //                 {page.pageName}
                        //             </Button>
                        //         </Link>
                        //     ))}
                        //     <IconButton
                        //         // aria-label="toggle password visibility"
                        //         // onClick={() => {}}
                        //         // onMouseDown={() => {}}
                        //         // edge="end"
                        //         aria-label="toggle profile menu"
                        //         aria-controls="profile-menu"
                        //         aria-haspopup="true"
                        //         onClick={handleProfileMenuClick}
                        //         edge="end"
                        //     >
                        //         <AccountCircleIcon />
                        //     </IconButton>
                        //     <ProfileMenu
                        //         anchorEl={profileMenuAnchor}
                        //         onClose={handleProfileMenuClose}
                        //     />
                        // </>
                        // <Link to="/auth">
                        //     <Button
                        //         className="ml-8 text-yellow-600"
                        //         color="inherit"
                        //         variant="outlined"
                        //         onClick={() => {
                        //             setAuthPage("login");
                        //         }}
                        //     >
                        //         Login
                        //     </Button>
                        // </Link>
                        null}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default TopBar;
