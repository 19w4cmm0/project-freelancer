const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
    loai_tac_pham: String,
    ten_tac_pham: String,
    mo_ta_tac_pham: String,
    img: String,
    gia: String,
    id_nguoi_sang_tao: String
})

const Design = mongoose.model("Design", designSchema, "tacpham")
module.exports = Design;