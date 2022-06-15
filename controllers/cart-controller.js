function addToCart(req, res) {
    if (req.session.firstName) {
        let cartArr = (req.cookies.cart) ? JSON.parse(req.cookies.cart) : [];
        cartArr.push({
            id: req.body,
            amount: 1
        });
        res.cookie('cart', JSON.stringify(cartArr));
        res.redirect("back");
    }
}

function getCart(req, res) {
    return JSON.parse(req.cookies.cart);
}

function removeFromCart(req, res) {

}

module.exports = {addToCart, removeFromCart};