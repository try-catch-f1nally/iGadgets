const {Schema, model} = require("mongoose");

const IPhone = new Schema({
    images: [
        String,
    ],
    name: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    model: {
        type: String, required: true
    },
    memory: {
        type: Number, required: true,
    },
    memories: [
        Number
    ],
    color: {
        type: String, required: true,
    },
    colors: [
        String
    ],
    isAvailable: {
        type: Boolean, required: true,
    },
    art: {
        type: Number, required: true
    },
    rating: {
        type: Number,
    },
    description: {
        header: {
            type: String, required: true,
        },
        paragraph: {
            type: String, required: true,
        },
        listHeader: {
            type: String, required: true,
        },
        listItems: [
            String
        ],
    },
    videoLink: {
        type: String,
    },
    characteristics: {
        version: {
            type: String, required: true,
        },
        size: {
            type: String, required: true,
        },
        cpu: {
            type: String, required: true,
        },
        camera: {
            type: String, required: true,
        },
        screen: {
            type: String, required: true,
        },
        protection: {
            type: String, required: true,
        },
    },
    comments: [{
        authorName: String,
        date: String,
        userId: String,
        rating: Number,
        text: String,
    }],
    saleStartDate: {
        type: String, required: true
    }
});

module.exports = model("IPhone", IPhone);