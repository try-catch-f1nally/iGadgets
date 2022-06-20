const {getProductsInCart} = require("./cart-controller");

function renderErrorPage(statusCode, statusTitle) {
    return async (req, res) => res
        .status(statusCode)
        .render("error", {
            title: statusTitle,
            firstName: req.session.firstName,
            productsInCart: await getProductsInCart(req)
        });
}

module.exports = {renderErrorPage};
