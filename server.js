const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@trycatchfinally.sra77.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const {renderErrorPage} = require("./controllers/error-controller");

const homeRoute = require("./routes/home-router");
const searchRoute = require("./routes/search-router");
const iPhonesRoute = require("./routes/iphones-router");
const iPhoneRoute = require("./routes/iphone-router");
const userRoute = require("./routes/user-router");
const cartRoute = require("./routes/cart-router");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: false
}));
app.use(cookieParser());

app.use(homeRoute);
app.use(searchRoute);
app.use(iPhonesRoute);
app.use(iPhoneRoute);
app.use(userRoute);
app.use(cartRoute);
app.use(renderErrorPage(404, "404 Not Found"));

(async () => {
    try {
        await mongoose.connect(uri);
        app.listen(process.env.PORT, () => console.log(`Server starts on port ${process.env.PORT}`));
    } catch (e) {
        console.log(e);
    }
})();