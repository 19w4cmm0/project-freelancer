const express = require('express');
const router = express.Router();
const controller = require("../../../controller/project.controller")


router.get('/', controller.index)
router.post('/create',controller.create )
router.get('/edit/:id', controller.edit)
router.patch('/edit/:id', controller.editPatch)
router.delete('/delete/:id', controller.delete)



module.exports = router;