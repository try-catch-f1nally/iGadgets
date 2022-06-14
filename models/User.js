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
    }
});

module.exports = model("User", User);

/*[
  {
    "firstname": "string",
    "lastname": "string",
    "passwordHash": "string",
    "orders": [
      {
        "number": "int",
        "products": ["id", "id", "id"],
        "totalAmount": "int",
        "status": "string",
        "waybill": "string",
        "recipient": {
          "fullName": "string",
          "phone": "string"
        },
        "delivery": {
          "serviceName": "string",
          "method": "string",
          "address": "string"
        },
        "payment": "string"
      }
    ]
  }
]*/