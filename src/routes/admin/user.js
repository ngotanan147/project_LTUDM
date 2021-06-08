const express = require('express')
const router = express.Router()

const adminUserController = require("../../app/controllers/admin/AdminUserController")

router.get('/', adminUserController.index)
router.get("/:slug", adminUserController.index)

module.exports = router