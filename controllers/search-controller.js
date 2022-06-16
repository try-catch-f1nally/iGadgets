const {renderErrorPage} = require("./error-controller");
const {getProductsInCart} = require("./cart-controller");

function getProductsByKeywords(keywords) {
    const products = [];
    //1. обратиться в базу данных, вытянуть все айфоны product.name
    //2. проитерироваться по вытянутым айфонам и вычислить совпадения с ключевыми словами
    //3. отсортировать по убыванию
    return products;
}

async function renderSearchPage(req, res) {
    let keywords = req.query.keywords.toLowerCase().split(" ");
    let page = +req.query.page || 1;
    let sort = req.params.sort || "newest";

    const products = getProductsByKeywords(keywords);
    const pages = Math.ceil(products.length / 12);

    try {
        res.render("search", {
            title: "iGadgets | Search",
            firstName: req.session.firstName,
            productsInCart: await getProductsInCart(req),
            page,
            pages,
            products,
            keywords,
            sort
        });
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

module.exports = {renderSearchPage};