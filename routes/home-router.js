const express = require("express");
const router = express.Router();
const {renderHomePage} = require("../controllers/home-controller");

router.get("/", renderHomePage);

module.exports = router;