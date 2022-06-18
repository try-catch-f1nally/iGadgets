const express = require("express");
const router = express.Router();
const {
    renderUserEditPage,
    editUser,
    changePassword,
} = require("../controllers/user-controller");

router.get("/user/settings", renderUserEditPage);
router.post("/user/edit-contact-info", editUser);
router.post("/user/change-password", changePassword);

module.exports = router;