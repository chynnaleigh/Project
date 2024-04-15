const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
    try {
        const {
            email,
            password,
            username,
            createdAt,
            lastLoginWeek,
            currentChallenge,
            previousChallenge,
            previousChallengeIndexes,
            isWeeklyStatusComplete,
        } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }
        const user = await User.create({
            email,
            password,
            username,
            createdAt,
            lastLoginWeek,
            currentChallenge,
            previousChallenge,
            previousChallengeIndexes,
            isWeeklyStatusComplete,
        });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({
            message: "User signed in successfully",
            success: true,
            user,
        });
        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log("email", email);
        console.log("password", password);
        if (!email || !password) {
            return res.json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "Incorrect password or email" });
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.json({ message: "Incorrect password or email" });
        }
        res.header("Access-Control-Allow-Credentials", true);
        res.header(
            "Access-Control-Allow-Methods",
            "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
        );
        const token = createSecretToken(user._id);
        res.cookie("authToken", token, {
            withCredentials: true,
            httpOnly: false,
            sameSite: "none",
            secure: true,
        });
        res.status(201).json({
            message: "User logged in successfully",
            success: true,
            authToken: token,
        });
        next();
    } catch (error) {
        console.error(error);
    }
};
