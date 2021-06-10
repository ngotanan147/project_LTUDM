const express = require('express')
const router = express.Router()

const adminRegisterController = require("../../app/controllers/admin/AdminRegisterController")

router.get('/', adminRegisterController.index)
router.post('/', adminRegisterController.register)
router.get('/:slug', adminRegisterController.index)

module.exports = router