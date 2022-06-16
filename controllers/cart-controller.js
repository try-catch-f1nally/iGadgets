const IPhone = require("../models/IPhone");

function addToCart(req, res) {
    if (req.session.firstName) {
        const productsId = (req.cookies.cart) ? JSON.parse(req.cookies.cart) : [];
        productsId.push({
            id: req.body,
            amount: 1
        });
        res.cookie('cart', JSON.stringify(productsId));
        res.redirect("back");
    }
}

async function getProductsInCart(req, res) {
    // const productsId = (req.cookies.cart) ? JSON.parse(req.cookies.cart) : [];
    // const productsInCart = (await IPhone.find({_id: {$in: productsId}})) || [];
    // console.log(productsInCart)
    // return productsInCart;
}

function removeFromCart(req, res) {

}

module.exports = {addToCart, getProductsInCart, removeFromCart};