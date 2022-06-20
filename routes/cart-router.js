const express = require("express");
const router = express.Router();
const {changeProductsInCart} = require("../controllers/cart-controller");

router.post("/change-cart", changeProductsInCart);

module.exports = router;