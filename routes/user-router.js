const express = require("express");
const router = express.Router();
const {
    renderOrdersPage,
    renderUserEditPage,
    renderCreateOrderPage,
    createOrder,
    editUser,
    changePassword,
    signUp,
    logIn,
    logOut
} = require("../controllers/user-controller");

router.get("/user/create-order", renderCreateOrderPage);
router.get("/user/settings", renderUserEditPage);
router.get("/user/orders", renderOrdersPage);
router.get("/log-out", logOut);

router.post("/user/create-order", createOrder);
router.post("/user/edit-contacts", editUser);
router.post("/user/change-password", changePassword);
router.post("/sign-up", signUp);
router.post("/log-in", logIn);

module.exports = router;