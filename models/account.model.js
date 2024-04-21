const mongoose = require("mongoose");
const generate = require("../helpers/generate")

const accountSchema = new mongoose.Schema(
    {
    ten_doanh_nghiep: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generate.generateRandomString(30)
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
},
    { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;