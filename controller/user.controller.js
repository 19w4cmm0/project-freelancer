const md5 = require("md5");
const User = require("../models/user.model")
const generate = require("../helpers/generate")

// [POST] /api/v1/users/register
module.exports.register = async (req, res) => {
    req.body.password = md5(req.body.password);
    const existEmail = await User.findOne({ email: req.body.email, deleted: false});

    if(existEmail) {
        res.json({
            code: 400,
            message: "Email đã tồn tại!"
        })
    } else {
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            token: generate.generateRandomString(30)
        });
        user.save();
        const token = user.token;
        res.cookie("token", token);

        res.json({
            code: 200,
            message: "Đăng ký thành công!",
            token: token
        })
    }
}

// [POST] /api/v1/users/login
module.exports.login = async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email
    });
    if(!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại!"
        });
        return;
    }
    if( md5(password) !== user.password) {
        res.json({
            code: 400,
            message: "Sai mật khẩu!"
            
        })
        return;
    }
    const token = user.token;
    res.cookie("token", token);

        res.json({
            code: 200,
            message: "Đăng nhập thành công!",
        });
}

// [GET] /api/v1/users/detail
module.exports.detail = async (req, res) => {
    try {
        const token = req.cookies.token;
        const user = await User.findOne({ token: token, deleted: false}).select("-password -token");

        res.json({
            code: 200,
            message: "Thành công!",
            info: user
        })

    } catch(error) {
        res.json({
            code: 400,
            message: "ERROR",
        })

    }
}