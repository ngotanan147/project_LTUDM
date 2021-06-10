const express = require('express')
const router = express.Router()

const adminLoginController = require("../../app/controllers/admin/AdminLoginController")

router.get('/', adminLoginController.index)
router.post('/', adminLoginController.login)
router.get('/:slug', adminLoginController.index)

module.exports = router