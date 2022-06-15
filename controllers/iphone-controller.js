const {renderErrorPage} = require("./error-controller");
const IPhone = require("../models/IPhone");

async function getProduct(modelParam, memoryParam, colorParam) {
    return (await IPhone.find({model: modelParam, memory: memoryParam, color: colorParam}))[0];
}

async function renderIPhonePage(req, res) {
    try {
        const {model: modelParam, memory: memoryParam, color: colorParam} = req.params;
        const {
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
            productsInCart: [],
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
            productId: "2938a97s99f93e39"
        });
    } catch (e) {
        console.log(e);
        renderErrorPage(500, "500 Server Error")(req, res);
    }
}

module.exports = {renderIPhonePage};