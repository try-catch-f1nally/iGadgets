const express = require("express");
const router = express.Router();
const {renderIPhonesPage} = require("../controllers/iphones-controller");

router.get("/iphones(/:sort)?", renderIPhonesPage);

module.exports = router;