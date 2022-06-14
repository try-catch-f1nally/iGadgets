const getParams = (req) => {
    let queryString = req.originalUrl.split("?")[1] || "";
    queryString = queryString.replace(/(&)?page=\d/, "");
    let models = req.query.model || [];
    let memories = req.query.memories || [];
    let colors = req.query.color || [];
    let page = +req.query.page || 1;
    let sort = req.params.sort || "newest";

    if (typeof models === "string") models = [models];
    if (typeof memories === "string") memories = [memories];
    if (typeof colors === "string") colors = [colors];
    return {models, memories, colors, page, sort, queryString};
};

const getProducts = (models, memories, colors) => {
    return [
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
        {
            img: "iphone-13-midnight.jpg",
            name: "Apple iPhone 13 128gb Midnight",
            price: "875",
            productPageHref : "/iphone-13-128gb-midnight"
        },
    ];
}

const getFilteredModels = (memories, colors) => {
    return ["13-pro-max", "13-pro", "13", "13-mini"];
};

const getFilteredMemories = (models, colors) => {
    return ["1024", "512", "256", "128"];
};

const getFilteredColors = (models, memories) => {
    return ["alpine-green", "blue", "gold", "graphite", "green", "midnight", "pink", "sierra-blue", "silver", "starlight", "red"]
};

const renderIPhonesPage = (req, res) => {
    let {models, memories, colors, page, sort, queryString} = getParams(req);
    const products = getProducts(models, memories, colors);
    const pages = Math.ceil(products.length / 12);
    const filteredModels = getFilteredModels(memories, colors);
    const filteredMemories = getFilteredMemories(models, colors);
    const filteredColors = getFilteredColors(models, memories);

    res.render("iphones", {
        title: "iGadgets | iPhones",
        firstName: req.session.firstName,
        productsInCart: [],
        models,
        memories,
        colors,
        filteredModels,
        filteredMemories,
        filteredColors,
        page,
        pages,
        sort,
        queryString,
        products
    });
};

module.exports = {renderIPhonesPage};