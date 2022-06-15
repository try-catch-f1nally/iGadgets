const express = require("express");
const router = express.Router();
const {addToCart, removeFromCart} = require("../controllers/cart-controller");

router.post("/add-to-cart", addToCart);
router.post("/remove-from-cart", removeFromCart);

module.exports = router;