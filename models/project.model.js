const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
    ten_du_an: String,
    mo_ta_du_an: String,
    nganh_nghe: String,
    so_luong: Number,
    ky_nang_can_thiet: String,
    muc_luong: Number,
    thoi_han_du_an: Date,
    han_chot_nop_ho_so: Date,
    id_nha_tuyen_dung: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
},
    { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema, "duan");

module.exports = Project;