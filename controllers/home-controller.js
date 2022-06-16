const {renderErrorPage} = require("./error-controller");
const {getProductsInCart} = require("./cart-controller");

function getTopRatingProducts() {
    return [
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: 875,
        },
        {
            img: "watch7-midnight.webp",
            name: "Apple Watch Series 7 45mm Midnight",
            price: 445
        },
        {
            img: "airpods-2.webp",
            name: "Apple AirPods 2",
            price: 125
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: 875,
        },
        {
            img: "watch7-midnight.webp",
            name: "Apple Watch Series 7 45mm Midnight",
            price: 445
        },
        {
            img: "airpods-2.webp",
            name: "Apple AirPods 2",
            price: 125
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: 875,
        },
        {
            img: "watch7-midnight.webp",
            name: "Apple Watch Series 7 45mm Midnight",
            price: 445
        },
        {
            img: "airpods-2.webp",
            name: "Apple AirPods 2",
            price: 125
        }
    ];
}

function getLatestProducts() {
    return [
        {
            img: "watch7-midnight.webp",
            name: "Apple Watch Series 7 45mm Midnight",
            price: 445
        },
        {
            img: "airpods-2.webp",
            name: "Apple AirPods 2",
            price: 125
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: 875,
        },
        {
            img: "watch7-midnight.webp",
            name: "Apple Watch Series 7 45mm Midnight",
            price: 445
        },
        {
            img: "airpods-2.webp",
            name: "Apple AirPods 2",
            price: 125
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: 875,
        },
        {
            img: "watch7-midnight.webp",
            name: "Apple Watch Series 7 45mm Midnight",
            price: 445
        },
        {
            img: "airpods-2.webp",
            name: "Apple AirPods 2",
            price: 125
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: 875,
        }
    ];
}

function renderHomePage(req, res) {
    try {
        const topRatingProducts = getTopRatingProducts();
        const latestProducts = getLatestProducts();
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