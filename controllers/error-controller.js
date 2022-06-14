const renderErrorPage = (statusCode, statusTitle) =>
    (req, res) => res
        .status(statusCode)
        .render("error", {
            title: statusTitle,
            firstName: req.session.firstName,
            productsInCart: []
        });

module.exports = {renderErrorPage};