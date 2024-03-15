const User = require("../Models/UserModel");

module.exports.WeeklyStatus = async (req, res, next) => {
    try {
        const { email, weeklyStatus } = req.body;
        console.log("weeklyStatus", weeklyStatus);
        if (!weeklyStatus || !email) {
            return res.json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "Cannot find user" });
        }
        res.status(200).json({
            message: "Weekly status updated successfully",
            success: true,
            previousChallengeStatuses: user.previousChallengeStatuses,
        });
    } catch (error) {
        console.error(error);
    }
};
