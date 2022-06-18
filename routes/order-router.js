const express = require("express");
const router = express.Router();
const {renderOrdersPage, renderCreateOrderPage, createOrder} = require("../controllers/order-controller");

router.get("/orders", renderOrdersPage);
router.get("/create-order", renderCreateOrderPage);
router.post("/create-order", createOrder);

module.exports = router;