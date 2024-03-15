import React, { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// Create a context
const AuthContext = createContext();

// Create a context provider
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);

    const [authPage, setAuthPage] = useState("login");

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [currentChallenge, setCurrentChallenge] = useState(null);
    const [previousChallenge, setPreviousChallenge] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Login function
    const login = (email, username) => {
        setEmail(email);
        setUsername(username);
        setIsLoggedIn(true);
    };

    // Logout function
    const logout = () => {
        setEmail("");
        setUsername("");
        setIsLoggedIn(false);
        removeCookie("token");
        navigate("/auth");
    };

    return (
        <AuthContext.Provider
            value={{
                authPage,
                setAuthPage,
                username,
                setUsername,
                email,
                setEmail,
                currentChallenge,
                setCurrentChallenge,
                previousChallenge,
                setPreviousChallenge,
                isLoggedIn,
                setIsLoggedIn,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to consume the context
export const useAuth = () => {
    return useContext(AuthContext);
};
