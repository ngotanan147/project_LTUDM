const express = require('express')
const router = express.Router()

const statisticController = require("../../app/controllers/admin/StatisticController")

router.get('/', statisticController.index)
router.get('/:slug', statisticController.index)

module.exports = router