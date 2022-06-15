const express = require("express");
const router = express.Router();
const {renderSearchPage} = require("../controllers/search-controller");

router.get("/search(/:sort)?", renderSearchPage);

module.exports = router;