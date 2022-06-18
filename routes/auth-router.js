const express = require("express");
const router = express.Router();
const {logOut, signUp, logIn} = require("../controllers/auth-controller");

router.get("/log-out", logOut);

router.post("/sign-up", signUp);
router.post("/log-in", logIn);

module.exports = router;