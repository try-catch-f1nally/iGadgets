const {Schema, model} = require("mongoose");

const User = new Schema({
    firstName: {
        type: String, required: true
    },
    lastName: {
        type: String, required: true
    },
    phone: {
        type: String, unique: true, required: true
    },
    password: {
        type: String, required: true
    },
    orders: [
        {
            number: Number,
            date: String,
            products: [
                {
                    img: String,
                    name: String,
                    art: Number,
                    price: Number,
                    amount: Number,
                    sum: Number,
                }
            ],
            totalAmount: Number,
            status: String,
            waybill: String,
            recipient: {
                fullName: String,
                phone: String
            },
            delivery: {
                service: String,
                method: String,
                city: String,
                department: String,
                address: String,
            },
            payment: String,
        }
    ]
});

module.exports = model("User", User);