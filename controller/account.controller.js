const md5 = require("md5");
const Account = require("../models/account.model")

// [POST] /api/v1/accounts/register
module.exports.register = async (req, res) => {
    req.body.password = md5(req.body.password);
    const existEmail = await Account.findOne({ email: req.body.email, deleted: false});

    if(existEmail) {
        res.json({
            code: 400,
            message: "Email đã tồn tại!"
        })
    } else {
        const account = new Account({
            ten_doanh_nghiep: req.body.ten_doanh_nghiep,
            email: req.body.email,
            password: req.body.password
        });
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
    const password = req.body.password;

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
    if( md5(password) !== account.password) {
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