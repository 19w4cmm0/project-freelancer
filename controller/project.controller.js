const Account = require("../models/account.model")
const User = require("../models/user.model")
const Project = require("../models/project.model")


// [GET] api/v1/project
module.exports.index = async (req, res) => {
    const project = await Project.find();
    res.json({
        code: 200,
        message: "Get thanh cong!",
        project: project
    });
}
// [POST] api/v1/project/create
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
// [GET] api/v1/project/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
    
        const project = await Project.findOne({_id: id});
        
        res.json({
            code: 200,
            message: "Success!",
            project: project
        })
    }catch(err) {
        res.json({
            code: 400,
            message: "Error!"
        })
    }
}
// [PATCH] /api/v1/project/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;
        await Project.updateOne({_id: id}, req.body);
        res.json({
            code: 200,
            message: "Cập nhật thành công!"
        })
    } catch(err) {
        res.json({
            code: 400,
            message: "Cập nhật thất bại!"
        })
    }
}

// [DELETE] /api/v1/project/delete/:id
module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await Project.deleteOne({ _id: id})

        res.json({
            code: 200,
            message: "Xóa dự án thành công!"
        })
    } catch(err) {
        res.json({
            code: 400,
            message: "ERROR!"
        })
    }
}

// [PATCH] /api/v1/project/ungtuyen/:idProject
module.exports.add_ung_tuyen = async (req, res) => {
    try{
    const id = req.params.idProject;
    const token = req.cookies.tokenUser;
    const user = await User.findOne( {token: token})
    await Project.updateOne({ _id: id}, {$push: { id_ung_tuyen: user.id}})

    res.json({
        code: 200,
        message: "Success!"
    })
    } catch(err) {
        res.json({
            code: 400,
            message: "ERROR"
        })

    }
}
