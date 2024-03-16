const dateInfo = require("../util/DateInfo");
const User = require("../Models/UserModel");
const weeklyChallenges = require("../util/constants/challenges");
const shuffleArray = require("../util/shuffleArray");
const randomInt = require("../util/randomUtils");

require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ status: false });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            const user = await User.findById(data.id);
            if (user) {
                // NOTE: have only one of the below two lines active at a time
                const lastLoginWeek = user.lastLoginWeek; // uncomment for normal usage
                // const lastLoginWeek = 1; // uncomment for spoof mode

                let newPreviousChallengeIndexes = user.previousChallengeIndexes;
                let newChallengeIndex = 0;
                let newCurrentChallenge = user.currentChallenge;
                let newPreviousChallenge = user.previousChallenge;
                let newIsWeeklyStatusComplete = true;

                // check if new week, if it is a new week get new challenge
                if (lastLoginWeek !== dateInfo.getThisWeek()) {
                    // check if every challenge hasn't been done
                    if (
                        newPreviousChallengeIndexes.length !==
                        weeklyChallenges.challenges.length
                    ) {
                        try {
                            newChallengeIndex = randomInt.getRandomInt(
                                weeklyChallenges.challenges.length,
                                newPreviousChallengeIndexes
                            );
                        } catch (error) {
                            console.error(error);
                        }
                        newCurrentChallenge =
                            weeklyChallenges.challenges[newChallengeIndex];

                        newPreviousChallengeIndexes.push(newChallengeIndex);
                    } else if (
                        newPreviousChallengeIndexes.length ===
                        weeklyChallenges.challenges.length
                    ) {
                        newPreviousChallengeIndexes = [];
                    }

                    newPreviousChallenge = user.currentChallenge; // set current challenge to previous
                    newIsWeeklyStatusComplete = false;

                    // update data to mongodb
                    const updatedUser = await User.findOneAndUpdate(
                        { email: user.email },
                        {
                            currentChallenge: newCurrentChallenge,
                            previousChallenge: newPreviousChallenge,
                            lastLoginWeek: dateInfo.getThisWeek(),
                            previousChallengeIndexes:
                                newPreviousChallengeIndexes,
                            isWeeklyStatusComplete: newIsWeeklyStatusComplete,
                        }
                    );
                }

                return res.json({
                    status: true,
                    email: user.email,
                    user: user.username,
                    currentChallenge: newCurrentChallenge,
                    previousChallenge: newPreviousChallenge,
                    previousChallengeStatuses: user.previousChallengeStatuses,
                    isWeeklyStatusComplete: newIsWeeklyStatusComplete,
                });
            } else return res.json({ status: false });
        }
    });
};
