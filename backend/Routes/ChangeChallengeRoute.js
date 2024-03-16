const { ChangeChallenge } = require("../Controllers/ChangeChallengeController");
const router = require("express").Router();

const changeChallenge =
    require("../Middlewares/ChangeChallengeMiddleware").changeChallenge;

router.post("/changeChallenge", changeChallenge, ChangeChallenge);

module.exports = router;
