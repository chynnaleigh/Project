const { Signup, Login } = require("../Controllers/AuthController");
const router = require("express").Router();

const userVerification =
    require("../Middlewares/AuthMiddleware").userVerification;

// router.post("/signup", Signup);
// router.post("/login", Login);
// Handle signup and login actions based on the 'action' query parameter
router.post("/auth", (req, res, next) => {
    const { action } = req.query;

    console.log(action);
    if (action === "signup") {
        Signup(req, res, next);
    } else if (action === "login") {
        Login(req, res, next);
    } else {
        // Handle other cases or return an error response
        res.status(400).json({ message: "Invalid action" });
    }
});
router.post("/", userVerification);

module.exports = router;
