const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dateInfo = require("../util/DateInfo");
const randomInt = require("../util/randomUtils");
const weeklyChallenges = require("../util/constants/challenges");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    lastLoginWeek: {
        type: Number,
        default: dateInfo.getThisWeek(),
    },
    currentChallenge: {
        type: Object,
        default: () => weeklyChallenges.challenges[dateInfo.getThisWeek() - 1],
    },
    previousChallenge: {
        type: Object,
        default: () => null,
    },
    previousChallengeIndexes: {
        type: Array,
        default: () => [dateInfo.getThisWeek() - 1],
    },
    isWeeklyStatusComplete: {
        type: Boolean,
        default: true,
    },
    previousChallengeStatuses: {
        type: Array,
        default: () => [],
    },
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
