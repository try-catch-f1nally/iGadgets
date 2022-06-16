const {renderErrorPage} = require("./error-controller");
const {getProductsInCart} = require("./cart-controller");
const IPhone = require("../models/IPhone");

async function getTopRatingProducts() {
    return IPhone.find().sort({rating: -1, name: 1}).limit(10);
}

async function getLatestProducts() {
    return IPhone.find().sort({createdAt: -1, name: 1}).limit(10);
}

async function renderHomePage(req, res) {
    try {
        res.render("index", {
            title: "iGadgets | Apple Gadgets",
            firstName: req.session.firstName,
            productsInCart: await getProductsInCart(req),
            topRatingProducts: await getTopRatingProducts(),
            latestProducts: await getLatestProducts()
        });
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

module.exports = {renderHomePage};