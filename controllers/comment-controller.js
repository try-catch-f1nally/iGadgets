const IPhone = require("../models/IPhone");
const {renderErrorPage} = require("./error-controller");

async function postComment(req, res) {
    try {
        const iPhone = await IPhone.findOne({_id: req.body.productId});
        iPhone.comments.push({
            authorName: req.body.authorName,
            date: new Date().toLocaleDateString("en-GB"),
            authorId: req.body.userId,
            rating: +req.body.evaluation,
            text: req.body.comment
        });
        await iPhone.save();
        await refreshRating(iPhone);
        res.redirect('back');
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

async function refreshRating(product) {
    const average = product.comments.length ?
        (product.comments
            .map(element => element.rating)
            .reduce((sum, res) => sum + res, 0) / product.comments.length)
        : 0;
    product.rating = +average.toFixed(2);
    await product.save();
}

async function deleteComment(req, res) {
    try {
        const {productId, commentId} = req.body;
        const iPhone = await IPhone.findOne({_id: productId});
        const commentIndex = iPhone.comments.map(element => element._id.toString()).indexOf(commentId);
        iPhone.comments.splice(commentIndex, 1);
        await iPhone.save();
        await refreshRating(iPhone);
        res.redirect('back');
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

module.exports = {postComment, deleteComment};