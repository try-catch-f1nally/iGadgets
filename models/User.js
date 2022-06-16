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
            products: [
                String
            ],
            totalAmount: Number,
            status: String,
            waybill: String,
            recipient: {
                fullName: String,
                phone: String
            },
            delivery: {
                serviceName: String,
                method: String,
                address: String
            },
            payment: String,
        }
    ]
});

module.exports = model("User", User);