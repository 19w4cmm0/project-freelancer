const Design = require("../models/design.model");
const User = require("../models/user.model.js");

// [GET] /api/v1/design
module.exports.index = async (req, res) => {
    try{ 
    const design = await Design.find();
    res.json({
        code: 200,
        message: "success",
        design: design
    })
    } catch {
        res.json({
            code: 400,
            message: "error"
        })
    }
}

// [POST] /api/v1/design/create
module.exports.create = async (req, res) => {
    try {        
        if(req.cookies.tokenUser) {
            const user = await User.findOne({
                token: req.cookies.tokenUser
            })

            req.body.id_nguoi_sang_tao = user.id;
        }
        const design = new Design(req.body);
        await design.save();

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
