const express = require('express')
const router = express.Router()

const logoutController = require("../../app/controllers/LogoutController")

router.get("/:slug", logoutController.index)
router.get("/", logoutController.index)


module.exports = router