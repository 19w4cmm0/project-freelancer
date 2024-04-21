const Account = require("../models/account.model")
const Project = require("../models/project.model")

// [POST] /admin/products/create
module.exports.create = async (req, res) => {
    
    const account = await Account.findOne({ token: req.cookies.tokenAcc});

    req.body.id_nha_tuyen_dung = account.id;

    const project = new Project(req.body);
    await project.save();

    res.json({
        code: 200,
        message: "Tạo dự án thành công!"
    });
};