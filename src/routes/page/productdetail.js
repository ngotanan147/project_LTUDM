const express = require('express')
const router = express.Router()

const productDetailController = require("../../app/controllers/ProductDetailController")

router.get("/:productId", productDetailController.index)
router.get("/:productId/:slug", productDetailController.notFound)


module.exports = router