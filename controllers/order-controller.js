const User = require("../models/User");
const {getProductsInCart} = require("./cart-controller");
const {renderErrorPage} = require("./error-controller");

async function getOrders(req) {
    return (await User.findOne({phone: req.session.phone}))
        .orders
        .sort((order1, order2) => order2.date.localeCompare(order1.date));
}

async function renderCreateOrderPage(req, res) {
    try {
        if (req.session.firstName) {
            res.render("create-order", {
                firstName: req.session.firstName,
                lastName: req.session.lastName,
                phone: req.session.phone,
                title: "iGadgets | Create order",
                productsInCart: await getProductsInCart(req)
            });
        } else {
            return renderErrorPage(403, "Authorisation Error")(req, res);
        }
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

async function renderOrdersPage(req, res) {
    try {
        if (req.session.firstName) {
            res.render("orders", {
                firstName: req.session.firstName,
                lastName: req.session.lastName,
                title: `iGadgets | ${req.session.firstName}`,
                productsInCart: await getProductsInCart(req),
                orders: await getOrders(req)
            });
        } else {
            return renderErrorPage(403, "Authorisation Error")(req, res);
        }
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

async function createOrder(req, res) {
    try {
        if (req.session.firstName) {
            const number = ((await User.findOne({phone: req.session.phone})).orders).length;
            await User.findOneAndUpdate(
                {phone: req.session.phone},
                {
                    $push: {
                        orders: {
                            number: number + 1,
                            date: new Date().toISOString().split("T")[0],
                            products: await getProductsInCart(req),
                            totalAmount: req.body.total,
                            status: "Pending dispatch",
                            waybill: "-",
                            recipient: {
                                fullName: req.body.recipientFirstName + " " + req.body.recipientLastName,
                                phone: req.body.recipientPhone
                            },
                            delivery: {
                                service: req.body.deliveryService,
                                method: req.body.deliveryMethod,
                                city: req.body.city,
                                department: (req.body.department === undefined) ? "" : req.body.department,
                                address: req.body.address,
                            },
                            payment: req.body.payment
                        }
                    }
                });
            res.clearCookie("cart");
            res.redirect("/orders");
        } else {
            return renderErrorPage(403, "Authorisation Error")(req, res);
        }
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

module.exports = {
    renderCreateOrderPage,
    renderOrdersPage,
    createOrder
};