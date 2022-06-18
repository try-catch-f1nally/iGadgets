const IPhone = require("../models/IPhone");
const {renderErrorPage} = require("./error-controller");
const {getProductsInCart} = require("./cart-controller");

async function getProduct(filter) {
    return (await IPhone.find(filter))[0];
}

async function renderIPhonePage(req, res) {
    try {
        const products = await getProduct(req.params);

        res.render("iphone", {
            firstName: req.session.firstName,
            id: req.session.userId,
            productsInCart: await getProductsInCart(req),
            ...products._doc
        });
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

module.exports = {renderIPhonePage};