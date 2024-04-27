
const User = require("../models/user.model")
const generate = require("../helpers/generate")

// [POST] /api/v1/users/register
module.exports.register = async (req, res) => {
    req.body.token = generate.generateRandomString(30);
    const existEmail = await User.findOne({ email: req.body.email});

    if(existEmail) {
        res.json({
            code: 400,
            message: "Email đã tồn tại!"
        })
    } else {
        const user = new User(req.body);
        user.save();
        const token = user.token;
        res.cookie("tokenUser", token);

        res.json({
            code: 200,
            message: "Đăng ký thành công!",
            tokenUser: token
        })
    }
}

// [POST] /api/v1/users/login
module.exports.login = async (req,res) => {
    const email = req.body.email;
    const password = req.body.mat_khau;

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
    console.log(password)
    console.log(user.mat_khau)
    if( password !== user.mat_khau) {
        res.json({
            code: 400,
            message: "Sai mật khẩu!"
            
        })
        return;
    }
    const token = user.token;
    res.cookie("tokenUser", token);

        res.json({
            code: 200,
            message: "Đăng nhập thành công!",
        });
}

// [GET] /api/v1/users/detail
module.exports.detail = async (req, res) => {
    try {
        const token = req.cookies.tokenUser;
        const user = await User.findOne({ token: token}).select("-password -token");

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