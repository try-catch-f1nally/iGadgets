const {renderErrorPage} = require("./error-controller");
const {getProductsInCart} = require("./cart-controller");
const IPhone = require("../models/IPhone");

async function getTopRatingProducts() {
    const products = await IPhone.find().sort({rating: -1, name: 1}).limit(10);
    const topRatingProducts = [];
    products.forEach(product =>
        topRatingProducts.push({
            img: product.images[0],
            name: product.name,
            price: product.price.toString(),
        })
    );
    return topRatingProducts;
}

async function getLatestProducts() {
    const products = await IPhone.find().sort({createdAt: -1, name: 1}).limit(10);
    const topRatingProducts = [];
    products.forEach(product => topRatingProducts.push({
            img: product.images[0],
            name: product.name,
            price: product.price.toString(),
        })
    );
    return topRatingProducts;
}

async function renderHomePage(req, res) {
    try {
        const topRatingProducts = await getTopRatingProducts();
        const latestProducts = await getLatestProducts();
        res.render("index", {
            title: "iGadgets | Apple Gadgets",
            firstName: req.session.firstName,
            productsInCart: getProductsInCart(req, res),
            topRatingProducts,
            latestProducts
        });
    } catch (e) {
        console.log(e);
        renderErrorPage(500, "500 Server Error")(req, res);
    }
}

module.exports = {renderHomePage};