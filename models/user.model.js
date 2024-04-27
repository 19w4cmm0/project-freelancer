const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
        ho_ten: String,
        mat_khau: String,
        email: String,
        token: String,
        gioi_tinh: String,
        so_dien_thoai: Number,
        ngay_sinh: Date,
        dia_chi: String,
        ky_nang: String,
        kinh_nghiem: String
}
    
);

const User = mongoose.model("User", userSchema, "nguoilaodong");

module.exports = User;