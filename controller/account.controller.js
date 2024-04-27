
const Account = require("../models/account.model")
const generate = require("../helpers/generate")

// [POST] /api/v1/accounts/register
module.exports.register = async (req, res) => {
    req.body.token = generate.generateRandomString(30);
    const existEmail = await Account.findOne({ email: req.body.email, deleted: false});

    if(existEmail) {
        res.json({
            code: 400,
            message: "Email đã tồn tại!"
        })
    } else {
        
        console.log(req.body)
        const account = new Account(req.body);
        account.save();
        const token = account.token;
        res.cookie("tokenAcc", token);

        res.json({
            code: 200,
            message: "Đăng ký thành công!",
            tokenAcc: token
        })
    }
}

// [POST] /api/v1/accounts/login
module.exports.login = async (req,res) => {
    const email = req.body.email;
    const password = req.body.mat_khau;

    const account = await Account.findOne({
        email: email
    });
    if(!account) {
        res.json({
            code: 400,
            message: "Email không tồn tại!"
        });
        return;
    }
    if( password !== account.mat_khau) {
        res.json({
            code: 500,
            message: "Sai mật khẩu!"
            
        })
        return;
    }
    const token = account.token;
    res.cookie("tokenAcc", token);

    res.json({
        code: 200,
        message: "Đăng nhập thành công!",
        tokenAcc: token
    })
}
// [GET] /api/v1/users/detail
module.exports.detail = async (req, res) => {
    try{
        const token = req.cookies.tokenAcc;
        const account = await Account.findOne({ token: token}).select("-passwoard - token");
        
        res.json({
            code: 200,
            message: "Thành công!",
            info: account
        })
    } catch(err) {
        res.json({
            code: 400,
            message: "ERROR"
        })

    }
}