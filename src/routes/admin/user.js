const express = require('express')
const router = express.Router()

const adminUserController = require("../../app/controllers/admin/AdminUserController")

router.get('/', adminUserController.index)
router.post('/create', adminUserController.create)
router.delete('/:id', adminUserController.delete)
router.put('/:id', adminUserController.update)
router.get("/:slug", adminUserController.index)

module.exports = router