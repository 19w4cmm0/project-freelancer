const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    tieu_de: String,
    img: String,
    noi_dung: String,
    loai_bai_viet: String,
    id_nguoi_tao: String
})

const Post = mongoose.model("Post", postSchema, "baiviet");
module.exports = Post;