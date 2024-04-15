const User = require("../Models/UserModel");

require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.changeChallenge = (req, res, next) => {
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
                // update current challenge to mongodb
                const updatedUser = await User.findOneAndUpdate(
                    { email: user.email },
                    {
                        currentChallenge: req.body.currentChallenge,
                    }
                );

                next();
            } else return res.json({ status: false });
        }
    });
};
