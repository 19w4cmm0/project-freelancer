const Task = require("../models/task.model");
const paginationHelper = require("../helpers/pagination")
const searchHelper = require("../helpers/search")

// /api/v1/tasks
module.exports.index = async (req, res) => {
    //find
    const find = {
        deleted: false
    };
    if(req.query.status) {
        find.status = req.query.status;
    }

    const objectSearch = searchHelper(req.query);

    if(req.query.keyword){
        find.title = objectSearch.regex;
    }
    //end find
    
   // Pagination
    let initPagination ={ 
        currentPage: 1,
        limitItems: 2,
    };
    const countTasks = await Task.countDocuments(find);
    const objectPagination = paginationHelper(
        initPagination,
        req.query,
        countTasks
    );
//End Pagination

    //sort 
    const sort = {};

    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }
    //end sort
    const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip);
    res.json(tasks);
};

// [GET] api/v1/task/detail/:id
module.exports.detail = async (req, res) => {
    try {
    const id = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    });
    res.json(task);
} catch (error) {
    res.json("Không tìm thấy!");
}
};

// [patch] api/v1/task/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
    const id = req.params.id;
    
    const status = req.body.status;

    await Task.updateOne({
        _id: id
    }, {
        status: status
    });

    res.json({
        code: 200,
        message: "Cập nhật trạng thái thành công"
    });
} catch (error) {
    res.json({
        code: 400,
        message: "Không tồn tại!"
    });
}
};

// [patch] api/v1/task/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
      const { ids, key, value } = req.body;

    switch (key) {
        case "status":
            await Task.updateMany({
                _id: {$in: ids}
            }, {
                status: value
            });

            res.json({
                code: 200,
                message: "Cập nhật trạng thái thành công!"
            })
        break;
        default:
            res.json({
                code: 400,
                message: "Không tồn tại!"
            });
        break;
    }
} catch (error) {
    res.json({
        code: 400,
        message: "Không tồn tại!"
    });
}
};

// [POST] api/v1/task/create
module.exports.create = async (req, res) => {
    try {
    const task = new Task(req.body);
    const data = await task.save();

    res.json({
        code: 200,
        message: "Tạo thành công",
        data: data
    });
    } catch (error) {
    res.json({
        code: 400,
        message: "Lỗi!"
    });
}
};

// [patch] api/v1/task/edit/:id
module.exports.edit = async (req, res) => {
    try {
    const id = req.params.id;

    await Task.updateOne({ _id: id}, req.body);

    res.json({
        code: 200,
        message: "Cập nhật thành công",
    });
    } catch (error) {
    res.json({
        code: 400,
        message: "Lỗi!"
    });
}
};

// [PATCH] api/v1/task/delete/:id
module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await Task.updateOne({
            _id: id
        }, {
        deleted: true,
        deletedAt: new Date()
    })
    res.json({
        code: 200,
        message: "Xóa thành công!"
    });
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}