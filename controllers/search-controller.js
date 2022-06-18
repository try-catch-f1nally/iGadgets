const {renderErrorPage} = require("./error-controller");
const {getProductsInCart} = require("./cart-controller");
const IPhone = require("../models/IPhone");

async function getProductsByKeywords(keywords) {
    const iphones = await IPhone.find();
    const map = new Map();
    for (let iphone of iphones) {
        const name = iphone.name.toLowerCase();
        let matches = 0;
        for (let keyword of keywords) {
            if (name.includes(keyword)) {
                matches++;
            }
        }
        if (matches > 0) {
            map.set(iphone, matches);
        }
    }
    const sortedMap = new Map([...map].sort((a, b) => b[1] - a[1]));
    return Array.from(sortedMap.keys());
}

async function renderSearchPage(req, res) {
    let keywords = req.query.keywords.toLowerCase().split(" ");
    let page = +req.query.page || 1;
    let sort = req.params.sort || "newest";

    const products = await getProductsByKeywords(keywords);
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