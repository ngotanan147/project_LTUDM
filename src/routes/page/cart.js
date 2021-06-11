const express = require('express')
const router = express.Router()

const cartController = require("../../app/controllers/CartController")

router.get('/', homeController.index)
router.get('/:slug', homeController.notFound)


module.exports = router