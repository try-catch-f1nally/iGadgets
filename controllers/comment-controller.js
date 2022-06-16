const IPhone = require("../models/IPhone");
const {renderErrorPage} = require("./error-controller");

async function postComment(req, res) {
    try {
        const {
            authorName: name,
            productId: productId,
            userId: userId,
            evaluation: rating,
            comment: text
        } = req.body;

        const iPhone = await IPhone.findOne({_id: productId});

        iPhone.comments.push({
            authorName: name,
            date: new Date().toLocaleDateString("en-GB"),
            userId: userId,
            rating: rating,
            text: text
        });
        await iPhone.save();
        await refreshRating(iPhone);
        res.redirect('back');
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

async function deleteComment(req, res) {
    try {
        const {productId, commentId} = req.body;
        const iPhone = await IPhone.findOne({_id: productId});

        const commentIndex = iPhone.comments.map(element => element._id.toString()).indexOf(commentId);
        iPhone.comments.splice(commentIndex, 1);
        await iPhone.save();
        await refreshRating(IPhone);
        res.redirect('back');
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

async function refreshRating(product) {
    const average = product.comments
        .map(element => element.rating)
        .reduce((sum, res) => sum + res, 0) / product.comments.length;
    product.rating = average.toFixed(2);
    await product.save();
}

module.exports = {postComment, deleteComment}