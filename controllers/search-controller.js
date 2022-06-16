const {renderErrorPage} = require("./error-controller");
const {getProductsInCart} = require("./cart-controller");

function getProductsByKeywords(keywords) {
    return [
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref: "/iphone-13-128gb-midnight"
        },
    ];
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
        renderErrorPage(500, "500 Server Error")(req, res);
    }
}

module.exports = {renderSearchPage};