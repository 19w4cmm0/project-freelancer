const Post = require("../models/post.model");
const Account = require("../models/account.model");
const User = require("../models/user.model");


// [GET] /api/v1/post
module.exports.index = async (req, res) => {
    const post = await Post.find();
    res.json({
        code: 200,
        message: "Success",
        post: post
    });
}

// [POST] /api/v1/post/create
module.exports.create = async (req, res) => {
    try {
        if(req.cookies.tokenAcc) {
            const account = await Account.findOne({
                token: req.cookies.tokenAcc
            })
        req.body.id_nguoi_tao = account.id;
        }

        if(req.cookies.tokenUser) {
            const user = await User.findOne({
                token: req.cookies.tokenUser
            })

            req.body.id_nguoi_tao = user.id;
        }

        const post = new Post(req.body);
        await post.save();

        res.json({
            code: 200,
            message: "success"
        })
    } catch {
        res.json({
            code: 400,
            message: "Error"
        })
    }
}