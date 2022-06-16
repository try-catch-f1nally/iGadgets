const IPhone = require("../models/IPhone");

function addToCart(req, res) {
    if (req.session.firstName) {
        const cookiesCart = (req.cookies.cart) ? JSON.parse(req.cookies.cart) : [];
        console.log(cookiesCart);
        for (let cookiePart of cookiesCart) {
            if (cookiePart.productId === req.body.productId) {
                cookiePart.amount = req.body.amount;
                break;
            }
        }
        console.log(cookiesCart);
        res.cookie('cart', JSON.stringify(cookiesCart));
        res.redirect("back");
    }
}

async function getProductsInCart(req) {
    let cookie = (req.cookies.cart) ? JSON.parse(req.cookies.cart) : [];
    const cookieMap = new Map();
    cookie.forEach(item => cookieMap.set(item.productId, item.amount));

    const productsId = (req.cookies.cart) ? JSON.parse(req.cookies.cart).map(item => item.productId) : [];
    // console.log(productsId)
    const products = (productsId.length) ? Array.from((await IPhone.find({_id: productsId}))) : [];

    const productsInCart = [];
    products.forEach(product => productsInCart.push({
        image: product.images[0],
        name: product.name,
        art: product.art,
        price: product.price,
        amount: cookieMap.get(product._id.toString()),
        sum: +product.price * +cookieMap.get(product._id.toString())
    }));
    return productsInCart;
}

function removeFromCart(req, res) {

}

module.exports = {addToCart, getProductsInCart, removeFromCart};