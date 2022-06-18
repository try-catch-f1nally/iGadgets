const {renderErrorPage} = require("./error-controller");
const IPhone = require("../models/IPhone");
const {getProductsInCart} = require("./cart-controller");

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
    if (models.length) {
        query.model = {$in: models};
    }
    if (memories.length) {
        query.memory = {$in: memories};
    }
    if (colors.length) {
        query.color = {$in: colors};
    }

    const sortFilter = {};
    if (sort === "asc") sortFilter.price = 1;
    if (sort === "desc") sortFilter.price = -1;
    if (sort === "top") sortFilter.rating = -1;
    if (sort === "newest") sortFilter.saleStartDate = -1;

    return IPhone.find(query).sort(sortFilter);
}

async function getFilteredModels(memories, colors) {
    const query = {};
    if (memories.length) {
        query.memory = {$in: memories};
    }
    if (colors.length) {
        query.color = {$in: colors};
    }
    return IPhone.find(query, {model: 1}).distinct('model');
}

async function getFilteredMemories(models, colors) {
    const query = {};
    if (models.length) {
        query.model = {$in: models};
    }
    if (colors.length) {
        query.color = {$in: colors};
    }
    return IPhone.find(query, {memory: 1}).distinct('memory');

}

async function getFilteredColors(models, memories) {
    const query = {};
    if (models.length) {
        query.model = {$in: models};
    }
    if (memories.length) {
        query.memories = {$in: memories};
    }
    return IPhone.find(query, {color: 1}).distinct('color');
}

async function renderIPhonesPage(req, res) {
    try {
        let {models, memories, colors, page, sort, queryString} = getParams(req);
        const products = await getProducts(models, memories, colors, sort);
        const pages = Math.ceil(products.length / 12);
        const filteredModels = Array.from(new Set(models.concat(await getFilteredModels(memories, colors))));
        const filteredMemories = Array.from(new Set(memories.concat((await getFilteredMemories(models, colors)).map(String))));
        const filteredColors = Array.from(new Set(colors.concat(await getFilteredColors(models, memories))));

        res.render("iphones", {
            title: "iGadgets | iPhones",
            firstName: req.session.firstName,
            productsInCart: await getProductsInCart(req),
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
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

module.exports = {renderIPhonesPage};