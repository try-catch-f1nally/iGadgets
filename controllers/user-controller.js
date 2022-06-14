const {renderErrorPage} = require("./error-controller");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

/*It must be cookie data
[
        {
            image: "iphone-13-midnight.jpg",
            name: "iPhone 13 128gb Midnight",
            art: "791575",
            price: 875,
            amount: 1,
            sum: 875
        },
        {
            image: "airpods-2.webp",
            name: "Apple AirPods 2",
            art: "778041",
            price: 125,
            amount: 2,
            sum: 250
        },
        {
            image: "watch7-midnight.webp",
            name: "Apple Watch Series 7 45mm Midnight",
            art: "792417",
            price: 445,
            amount: 1,
            sum: 445
        }
    ]*/

const renderUserEditPage = (req, res) => {
    res.render("account-settings", {
        firstName: req.session.firstName,
        lastName: req.session.lastName,
        phone: req.session.phone,
        title: `iGadgets | ${req.session.firstName}`,
        productsInCart: []
    });
};

const renderCreateOrderPage = (req, res) => {
    res.render("create-order", {
        firstName: req.session.firstName,
        lastName: req.session.lastName,
        phone: req.session.phone,
        title: "iGadgets | Create order",
        productsInCart: [
            {
                image: "iphone-13-midnight.jpg",
                name: "iPhone 13 128gb Midnight",
                art: "791575",
                price: 875,
                amount: 1,
                sum: 875
            },
            {
                image: "airpods-2.webp",
                name: "Apple AirPods 2",
                art: "778041",
                price: 125,
                amount: 2,
                sum: 250
            },
            {
                image: "watch7-midnight.webp",
                name: "Apple Watch Series 7 45mm Midnight",
                art: "792417",
                price: 445,
                amount: 1,
                sum: 445
            }
        ]
    });
};

const renderOrdersPage = (req, res) => {
    res.render("orders", {
        firstName: req.session.firstName,
        lastName: req.session.lastName,
        title: `iGadgets | ${req.session.firstName}`,
        productsInCart: [],
        orders: getOrders()
    });
};

const getOrders = (req, res) => {
    return [
        {
            number: 9213184,
            date: "2022-06-01",
            totalAmount: 1570,
            status: "Pending dispatch",
            waybill: "-",
            recipient: {
                name: "Boris Johnsonuk",
                phone: "+380998887766",
            },
            delivery: {
                service: "Meest Express",
                method: "Pickup on delivery",
                city: "Zhytomyr",
                department: 23,
                address: null
            },
            payment: "Payment on delivery",
            products: [
                {
                    img: "iphone-13-midnight.jpg",
                    name: "iPhone 13 128gb Midnight",
                    art: 791575,
                    price: 875,
                    amount: 1,
                    sum: 875
                },
                {
                    img: "airpods-2.webp",
                    name: "Apple AirPods 2",
                    art: 778041,
                    price: 125,
                    amount: 2,
                    sum: 250
                },
                {
                    img: "watch7-midnight.webp",
                    name: "Apple Watch Series 7 45mm Midnight",
                    art: 792417,
                    price: 445,
                    amount: 1,
                    sum: 445
                }
            ]
        },
        {
            number: 9234813,
            date: "2022-05-30",
            totalAmount: 1125,
            status: "In transit",
            waybill: "IG1293481010",
            recipient: {
                name: "Vasya Pupkin",
                phone: "+380976543210",
            },
            delivery: {
                service: "Nova Poshta",
                method: "Pickup on delivery",
                city: "Kyiv",
                department: 105,
                address: null
            },
            payment: "Online by card",
            products: [
                {
                    img: "iphone-13-midnight.jpg",
                    name: "iPhone 13 128gb Midnight",
                    art: 791575,
                    price: 875,
                    amount: 1,
                    sum: 875
                },
                {
                    img: "airpods-2.webp",
                    name: "Apple AirPods 2",
                    art: 778041,
                    price: 125,
                    amount: 2,
                    sum: 250
                }
            ]
        },
        {
            number: 9234813,
            date: "2022-05-10",
            totalAmount: 875,
            status: "Completed",
            waybill: "IG1293481293",
            recipient: {
                name: "Vasya Pupkin",
                phone: "+380976543210",
            },
            delivery: {
                service: "Nova Poshta",
                method: "Pickup on delivery",
                city: "Kyiv",
                department: 105,
                address: null
            },
            payment: "Online by card",
            products: [
                {
                    img: "iphone-13-midnight.jpg",
                    name: "iPhone 13 128gb Midnight",
                    art: 791575,
                    price: 875,
                    amount: 1,
                    sum: 875
                }
            ]
        }
    ];
}

const createOrder = (req, res) => {
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
    console.log(req.body);
};

const editUser = (req, res) => {

};

const changePassword = (req, res) => {

};

const signUp = async (req, res) => {
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
        req.session.save(() => res.redirect("back"));
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
};

const logIn = async (req, res) => {
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
        req.session.save(() => res.redirect("back"));
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
};

const logOut = (req, res) => {
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