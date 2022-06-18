const IPhone = require("../models/IPhone");

function changeProductsInCart(req, res) {
    try {
        if (req.session.firstName) {
            const productsCart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
            const productIndex = productsCart.map(item => item.productId).indexOf(req.body.productId);

            if (productIndex !== -1) {
                productsCart.splice(productIndex, 1);
            }
            if (req.body.amount !== 0) {
                productsCart.push(req.body);
            }

            res.cookie('cart', JSON.stringify(productsCart));
            res.redirect("back");
        }
    } catch (e) {
        console.log(e);
    }
}

async function getProductsInCart(req) {
    if (req.session.firstName) {
        if (!req.cookies.cart) return [];

        const productsCart = JSON.parse(req.cookies.cart);
        const cookieMap = new Map();
        productsCart.forEach(item => cookieMap.set(item.productId, item.amount));

        const productsId = productsCart.map(item => item.productId);
        const products = (productsId.length) ? Array.from((await IPhone.find({_id: productsId}))) : [];
        const productsInCart = [];
        products.forEach(product => productsInCart.push({
            id: product._id.toString(),
            image: product.images[0],
            name: product.name,
            art: product.art,
            price: product.price,
            amount: cookieMap.get(product._id.toString()),
            sum: +product.price * +cookieMap.get(product._id.toString())
        }));

        return productsInCart;
    }
}

module.exports = {changeProductsInCart, getProductsInCart};