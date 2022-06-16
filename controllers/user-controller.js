const {renderErrorPage} = require("./error-controller");
const {getProductsInCart} = require("./cart-controller");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function getOrders(req) {
    return (await User.findOne({ phone: req.session.phone })).orders;
}

async function renderUserEditPage(req, res) {
    try {
        res.render("account-settings", {
            firstName: req.session.firstName,
            lastName: req.session.lastName,
            phone: req.session.phone,
            title: `iGadgets | ${req.session.firstName}`,
            productsInCart: await getProductsInCart(req)
        });
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

async function renderCreateOrderPage(req, res) {
    try {
        res.render("create-order", {
            firstName: req.session.firstName,
            lastName: req.session.lastName,
            phone: req.session.phone,
            title: "iGadgets | Create order",
            productsInCart: await getProductsInCart(req)
        });
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

async function renderOrdersPage(req, res) {
    try {
        res.render("orders", {
            firstName: req.session.firstName,
            lastName: req.session.lastName,
            title: `iGadgets | ${req.session.firstName}`,
            productsInCart: await getProductsInCart(req),
            orders: await getOrders(req)
        });
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

async function createOrder(req, res) {
    try {
        const {
            recipientFirstName,
            recipientLastName,
            recipientPhone,
            deliveryService,
            deliveryMethod,
            city,
            department,
            address,
            payment
        } = req.body;

        const user = await User
            .findOneAndUpdate(
                { phone: req.session.phone },
                {
                    $push: {
                        orders: {
                            number: 1,
                            products: ["1", "2"],
                            totalAmount: 5,
                            status: "Pending dispatch",
                            waybill: "IG1293481010",
                            recipient: {
                                fullName: recipientFirstName + " " + recipientLastName,
                                phone: recipientPhone
                            },
                            delivery: {
                                serviceName: deliveryService,
                                method: deliveryMethod,
                                address: city + address + " " + department
                            },
                            payment: payment,
                        }
                    }
                });
        res.redirect("/user/orders");
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

async function editUser(req, res) {
    try {

    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

async function changePassword(req, res) {
    try {

    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

async function signUp(req, res) {
    try {
        const {firstName, lastName, phone, password, password2} = req.body;

        if (password !== password2) {
            return renderErrorPage(400, "Passwords don't match!")(req, res);

        }
        if (password.length < 5 || password.length > 20) {
            return renderErrorPage(400, "Passwords must be greater than 5 and less than 20 symbols!")(req, res);

        }
        if (!/^\+\d{12}$/.test(phone)) {
            return renderErrorPage(400, "Wrong phone format! Please enter your phone number like +380971234567.")(req, res);
        }
        const candidate = await User.findOne({phone});
        if (candidate) {
            return renderErrorPage(400, `User with such phone number: ${phone} already exists!`)(req, res);
        }
        const passwordHash = bcrypt.hashSync(password, 7);
        const user = new User({firstName, lastName, phone, password: passwordHash});
        await user.save();
        req.session.firstName = firstName;
        req.session.lastName = lastName;
        req.session.phone = phone;
        req.session.id = user._id;
        console.log(req.session.id);
        req.session.save(() => res.redirect("back"));
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

async function logIn (req, res) {
    try {
        const {phone, password} = req.body;
        const user = await User.findOne({phone});
        if (!user) {
            return renderErrorPage(400, `User with phone ${phone} not found!`)(req, res);
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return renderErrorPage(400, "Wrong password entered!")(req, res);
        }
        req.session.firstName = user.firstName;
        req.session.lastName = user.lastName;
        req.session.phone = phone;
        req.session.id = user._id;
        req.session.save(() => res.redirect("back"));
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

function logOut(req, res) {
    try {
        req.session.destroy(() => res.redirect("/"));
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

module.exports = {
    renderUserEditPage,
    renderCreateOrderPage,
    renderOrdersPage,
    editUser,
    changePassword,
    createOrder,
    signUp,
    logIn,
    logOut
};
