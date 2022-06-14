const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const {renderErrorPage} = require("./controllers/error-controller");

const homeRoute = require("./routes/home-router");
const iPhonesRoute = require("./routes/iphones-router");
const iPhoneRoute = require("./routes/iphone-router");
const userRoute = require("./routes/user-router");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: false
}))

app.use(homeRoute);
app.use(iPhonesRoute);
app.use(iPhoneRoute);
app.use(userRoute);
app.use(renderErrorPage(404, "404 Not Found"));

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(process.env.PORT, () => console.log(`Server starts on port ${process.env.PORT}`));
    } catch (e) {
        console.log(e);
    }
})();