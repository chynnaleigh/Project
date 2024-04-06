import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
    InputAdornment,
    IconButton,
    TextField,
    Box,
    Typography,
    Container,
    Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useAuth } from "../../utils/contexts/AuthContext";

const SignupCard = ({ togglePage }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    // const { login } = useAuth();

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
    });
    const { email, password, confirmPassword, username } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            handleError("Passwords do not match.");
            return;
        }
        try {
            const { data } = await axios.post(
                "http://localhost:4000/auth?action=signup",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
        });
    };

    return (
        <>
            <Container
                component="main"
                maxWidth="xs"
                className="p-16 bg-gray-50 rounded-3xl"
            >
                <Box
                    component="form"
                    sx={{ display: "flex", flexDirection: "column" }}
                    onSubmit={handleSubmit}
                >
                    <Typography className="text-center text-2xl font-extrabold font-sans">
                        Welcome to SustainaBee
                    </Typography>
                    <Typography className="text-center text-lg font-thin font-sans">
                        Sign Up to start your sustainablity journey!
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleOnChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleOnChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="current-password"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleOnChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        autoComplete="current-password"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleOnChange}
                    />
                    <Button
                        className="bg-yellow-400 text-gray-50 font-sans mt-2 p-2 hover:brightness-105 ease-in-out"
                        color="primary"
                        type="submit"
                    >
                        Create Account
                    </Button>
                    <Typography className="text-center font-thin font-sans">
                        Already have an account?{" "}
                        <button
                            onClick={togglePage} // Use the togglePage function passed from Login component
                            className="text-yellow-600 underline font-medium"
                        >
                            LOGIN
                        </button>
                    </Typography>
                </Box>
            </Container>
        </>
    );
};

export default SignupCard;
