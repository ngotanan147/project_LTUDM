const express = require('express')
const router = express.Router()

const productController = require("../../app/controllers/ProductController")

router.get('/', productController.index)
router.get('/getProduct', productController.getAll)
router.get('/getProductByCategory/:category', productController.getProductByCategory)
router.get('/:slug', productController.notFound)


module.exports = router