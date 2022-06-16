const IPhone = require("../models/IPhone");
const {renderErrorPage} = require("./error-controller");
const {getProductsInCart} = require("./cart-controller");

async function getProduct(modelParam, memoryParam, colorParam) {
    return (await IPhone.find({model: modelParam, memory: memoryParam, color: colorParam}))[0];
}

async function renderIPhonePage(req, res) {
    try {
        const {model: modelParam, memory: memoryParam, color: colorParam} = req.params;
        const {
            _id: productId,
            images,
            name,
            price,
            model,
            memory,
            memories,
            color,
            colors,
            isAvailable,
            rating,
            description,
            videoLink,
            characteristics,
            comments
        } = await getProduct(modelParam, memoryParam, colorParam);

        res.render("iphone", {
            title: name,
            firstName: req.session.firstName,
            id: req.session.userId,
            productsInCart: await getProductsInCart(req),
            images,
            name,
            price,
            model,
            memory,
            memories,
            color,
            colors,
            isAvailable,
            rating,
            description,
            videoLink,
            characteristics,
            comments,
            productId
        });
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

module.exports = {renderIPhonePage};