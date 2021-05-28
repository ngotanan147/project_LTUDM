const express = require('express')
const router = express.Router()

const siteController = require("../app/controllers/SiteController")

router.get("/:slug", siteController.show)
router.get("/", siteController.index)


module.exports = router