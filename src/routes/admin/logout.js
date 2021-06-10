const express = require('express')
const router = express.Router()

const adminLogoutController = require("../../app/controllers/admin/AdminLogoutController")

router.get("/", adminLogoutController.index)
router.get("/:slug", adminLogoutController.index)


module.exports = router