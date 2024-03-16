const User = require("../Models/UserModel");

module.exports.ChangeChallenge = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "Cannot find user" });
        }
        res.status(200).json({
            message: "Change challenge updated successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
    }
};
