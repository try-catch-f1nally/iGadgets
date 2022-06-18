const {renderErrorPage} = require("./error-controller");
const {getProductsInCart} = require("./cart-controller");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function renderUserEditPage(req, res) {
    try {
        if (req.session.firstName) {
            res.render("account-settings", {
                firstName: req.session.firstName,
                lastName: req.session.lastName,
                phone: req.session.phone,
                title: `iGadgets | ${req.session.firstName}`,
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

async function editUser(req, res) {
    try {
        if (req.session.firstName) {
            const {newFirstName, newLastName, newPhone} = req.body;
            const user = await User.findOne({phone: req.session.phone});

            if (newFirstName < 3 || newFirstName > 20 || newLastName < 3 || newLastName > 20) {
                return renderErrorPage(400, "First and last name cannot be shorter than 4 or longer than 20 characters.")(req, res);
            }
            if (!/^\+\d{12}$/.test(newPhone)) {
                return renderErrorPage(400, "Wrong phone format! Please enter your phone number like +380971234567.")(req, res);
            }

            user.firstName = newFirstName;
            req.session.firstName = newFirstName;
            user.lastName = newLastName;
            req.session.lastName = newLastName;
            user.phone = newPhone;
            req.session.phone = newPhone;

            await user.save();
            req.session.save(() => res.redirect("back"));
        } else {
            return renderErrorPage(403, "Authorisation Error")(req, res);
        }
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

async function changePassword(req, res) {
    try {
        if (req.session.firstName) {
            const {oldPassword, newPassword, newPassword2} = req.body;
            const user = await User.findOne({phone: req.session.phone});
            if (!bcrypt.compareSync(oldPassword, user.password)) {
                return renderErrorPage(400, "Wrong old password!")(req, res);
            }
            if (newPassword !== newPassword2) {
                return renderErrorPage(400, "Passwords do not match!")(req, res);
            }
            if (newPassword.length < 5 || newPassword.length > 20) {
                return renderErrorPage(400, "Passwords must be greater than 5 and less than 20 symbols!")(req, res);
            }
            user.password = bcrypt.hashSync(newPassword, 7);
            await user.save();
            res.redirect("back");
        } else {
            return renderErrorPage(403, "Authorisation Error")(req, res);
        }
    } catch (e) {
        console.log(e);
        return renderErrorPage(500, "500 Server Error")(req, res);
    }
}

module.exports = {
    renderUserEditPage,
    editUser,
    changePassword
};
