const User = require("../Models/UserModel");

require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.updateWeeklyStatus = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.json({ status: false });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            const user = await User.findById(data.id);
            if (user) {
                console.log("updating weekly status: ", req.body.weeklyStatus);
                const newPreviousChallengeStatuses = [
                    ...user.previousChallengeStatuses,
                    [req.body.weeklyStatus, req.body.previousChallenge],
                ];
                // update weekly status to mongodb
                const updatedUser = await User.findOneAndUpdate(
                    { email: user.email },
                    {
                        isWeeklyStatusComplete: true,
                        previousChallengeStatuses: newPreviousChallengeStatuses,
                    }
                );

                next();
            } else return res.json({ status: false });
        }
    });
};
