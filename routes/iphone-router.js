const express = require("express");
const router = express.Router();
const {renderIPhonePage} = require("../controllers/iphone-controller");

router.get("/iphone-:model-:memory-:color", renderIPhonePage);

module.exports = router;