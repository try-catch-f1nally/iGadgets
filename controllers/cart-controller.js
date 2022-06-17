const IPhone = require("../models/IPhone");

function changeProductsInCart(req, res) {
    if (req.session.firstName) {
        const cookiesCart = (req.cookies.cart) ? JSON.parse(req.cookies.cart) : [];
        let idWasFind = false;
        for (let i = 0; i < cookiesCart.length; i++) {
            if (cookiesCart[i].productId === req.body.productId) {
                if (req.body.amount === 0) {
                    cookiesCart.splice(i, 1);
                } else {
                    cookiesCart[i].amount = req.body.amount;
                }
                idWasFind = true;
                break;
            }
        }
        if (!idWasFind) {
            cookiesCart.push(req.body);
        }
        res.cookie('cart', JSON.stringify(cookiesCart));
        res.redirect("back");
    }
}

async function getProductsInCart(req) {
    let cookie = (req.cookies.cart) ? JSON.parse(req.cookies.cart) : [];
    const cookieMap = new Map();
    cookie.forEach(item => cookieMap.set(item.productId, item.amount));

    const productsId = (req.cookies.cart) ? JSON.parse(req.cookies.cart).map(item => item.productId) : [];
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

module.exports = {changeProductsInCart, getProductsInCart};