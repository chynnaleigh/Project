import React, { useState } from "react";
import { useAuth } from "../utils/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    Typography,
    IconButton,
    Tooltip,
} from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const ProfileMenu = ({ anchorEl, onClose }) => {
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const { logout } = useAuth();
    const [, removeCookie] = useCookies([]);

    const handleLogout = () => {
        removeCookie("token");
        logout();
        onClose(); // Close the profile menu
        navigate("/auth");
    };
    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={onClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <Typography>Welcome</Typography>
            <MenuItem onClick={onClose}>
                <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={onClose}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
};

export default ProfileMenu;
