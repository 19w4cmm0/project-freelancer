const mongoose = require("mongoose");
const generate = require("../helpers/generate")

const accountSchema = new mongoose.Schema(
    {
    ten_doanh_nghiep: String,
    email: String,
    mat_khau: String,
    token: {
        type: String,
        default: generate.generateRandomString(30)
    },
    linh_vuc_hoat_dong: String,
    dia_chi: String,
    so_dien_thoai: Number,
    link_website: String,
    logo: String
    }   
);

const Account = mongoose.model("Account", accountSchema, "doanhnghiep");

module.exports = Account;