const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {renderErrorPage} = require("./error-controller");

async function signUp(req, res) {
    try {
        const {firstName, lastName, phone, password, password2} = req.body;

        if (firstName < 3 || firstName > 20 || lastName < 3 || lastName > 20) {
            return renderErrorPage(400, "First and last name cannot be shorter than 4 or longer than 20 characters ")(req, res);
        }
        if (password !== password2) {
            return renderErrorPage(400, "Passwords don't match!")(req, res);
        }
        if (password.length < 5 || password.length > 20) {
            return renderErrorPage(400, "Passwords must be greater than 5 and less than 20 symbols!")(req, res);
        }
        if (!/^\+\d{12}$/.test(phone)) {
            return renderErrorPage(400, "Wrong phone format! Please enter your phone number like +380971234567.")(req, res);
        }
        if (await User.findOne({phone})) {
            return renderErrorPage(400, `User with phone number: ${phone} already exists!`)(req, res);
        }
        const passwordHash = bcrypt.hashSync(password, 7);
        const user = new User({firstName, lastName, phone, password: passwordHash});
        await user.save();
        req.session.firstName = firstName;
        req.session.lastName = lastName;
        req.session.phone = phone;
        req.session.userId = user._id;
        req.session.save(() => res.redirect("/"));
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

async function logIn(req, res) {
    try {
        const {phone, password} = req.body;
        const user = await User.findOne({phone});

        if (!user) {
            return renderErrorPage(400, `User with phone ${phone} not found!`)(req, res);
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return renderErrorPage(400, "Wrong password entered!")(req, res);
        }

        req.session.firstName = user.firstName;
        req.session.lastName = user.lastName;
        req.session.phone = phone;
        req.session.userId = user._id;
        req.session.save(() => res.redirect("/"));
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

function logOut(req, res) {
    try {
        if (req.session.firstName) {
            req.session.destroy(() => res.redirect("/"));
        }
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

module.exports = {
    signUp,
    logIn,
    logOut
}