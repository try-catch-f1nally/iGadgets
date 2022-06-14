const getTopRatingProducts = () => {
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
};

const getLatestProducts = () => {
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
};

const renderHomePage = (req, res) => {
    const topRatingProducts = getTopRatingProducts();
    const latestProducts = getLatestProducts();
    res.render("index", {
        title: "iGadgets | Apple Gadgets",
        firstName: req.session.firstName,
        productsInCart: [
            {
                image: "iphone-13-midnight.jpg",
                name: "iPhone 13 128gb Midnight",
                art: "791575",
                price: 875,
                amount: 1,
                sum: 875
            },
            {
                image: "airpods-2.webp",
                name: "Apple AirPods 2",
                art: "778041",
                price: 125,
                amount: 2,
                sum: 250
            },
            {
                image: "watch7-midnight.webp",
                name: "Apple Watch Series 7 45mm Midnight",
                art: "792417",
                price: 445,
                amount: 1,
                sum: 445
            }
        ],
        topRatingProducts,
        latestProducts
    });
};

module.exports = {renderHomePage};