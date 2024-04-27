const express = require('express');
const router = express.Router();
const controller = require("../../../controller/project.controller")


router.get('/', controller.index)
router.post('/create',controller.create )
router.get('/edit/:id', controller.edit)
router.patch('/edit/:id', controller.editPatch)
router.delete('/delete/:id', controller.delete)
router.patch('/ungtuyen/:idProject', controller.add_ung_tuyen)



module.exports = router;