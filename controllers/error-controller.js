function renderErrorPage(statusCode, statusTitle) {
    return (req, res) => res
        .status(statusCode)
        .render("error", {
            title: statusTitle,
            firstName: req.session.firstName,
            productsInCart: []
        });
}

module.exports = {renderErrorPage};