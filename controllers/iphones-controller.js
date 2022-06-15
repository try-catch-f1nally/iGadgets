const {renderErrorPage} = require("./error-controller");
const IPhone = require("../models/IPhone");

function getParams(req) {
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
}

async function getProducts(models, memories, colors, sort) {
    const query = {};
    if (models.length)
        query.model = {$in: models};

    if (memories.length)
        query.memory = {$in: memories};

    if (colors.length)
        query.color = {$in: colors};

    const sortFilter = {};
    if (sort === "asc") sortFilter.price = 1;
    if (sort === "desc") sortFilter.price = -1;
    if (sort === "top") sortFilter.rating = -1;
    const products = await IPhone.find(query).sort(sortFilter);
    const iphones = [];
    products.forEach(product =>
        iphones.push(
            {
                img: product.images[0],
                name: product.name,
                price: product.price.toString(),
                productPageHref: "/iphone-" + product.model + "-" + product.memory + "-" + product.color,
            },
        ),
    );
    return iphones;
    // return [
    //     {
    //         img: "iphone-13-midnight.jpg",
    //         name: "Apple iPhone 13 128gb Midnight",
    //         price: "875",
    //         productPageHref : "/iphone-13-128gb-midnight"
    //     },
    // ];
}

async function getFilteredModels(memories, colors) {
    const query = {};
    if (memories.length)
        query.memory = {$in: memories};
    if (colors.length)
        query.color = {$in: colors};
    return IPhone.find(query, {model: 1}).distinct('model');
}

async function getFilteredMemories(models, colors) {
    const query = {};
    if (models.length)
        query.model = { $in: models };
    if (colors.length)
        query.color = { $in: colors };
    return IPhone.find(query, {memory: 1}).distinct('memory');

}

async function getFilteredColors(models, memories) {
    const query = {};

    if (models.length)
        query.model = { $in: models };

    if (memories.length)
        query.memories = { $in: memories };

    return IPhone.find(query, {color: 1}).distinct('color');
}

async function renderIPhonesPage(req, res) {
    try {
        let {models, memories, colors, page, sort, queryString} = getParams(req);
        const products = await getProducts(models, memories, colors, sort);
        const pages = Math.ceil(products.length / 12);
        const filteredModels = await getFilteredModels(memories, colors);
        const filteredMemories = (await getFilteredMemories(models, colors)).map(String);
        const filteredColors = await getFilteredColors(models, memories);

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
    } catch (e) {
        console.log(e);
        renderErrorPage(500, "500 Server Error")(req, res);
    }
}

module.exports = {renderIPhonesPage};