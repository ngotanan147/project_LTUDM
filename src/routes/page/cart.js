const express = require('express')
const router = express.Router()

const cartController = require("../../app/controllers/CartController")

router.get('/', cartController.index)
router.post('/:id', cartController.addToCart)
router.post('/updateCart/:id/:action', cartController.updateCart)
router.get('/getCart', cartController.getCart)
router.get('/pay', cartController.pay)
router.delete('/:id', cartController.delete)
router.get('/:slug', cartController.notFound)


module.exports = router