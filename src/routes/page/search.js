const express = require('express')
const router = express.Router()

const searchController = require("../../app/controllers/SearchController")

router.get("/", searchController.index)
router.get("/others/:query", searchController.index)
router.get("/:query", searchController.search)
router.get("/:slug", searchController.index)

module.exports = router