const { WeeklyStatus } = require("../Controllers/WeeklyStatusController");
const router = require("express").Router();

const updateWeeklyStatus =
    require("../Middlewares/WeeklyStatusMiddleware").updateWeeklyStatus;

router.post("/weeklyStatus", updateWeeklyStatus, WeeklyStatus);

module.exports = router;
