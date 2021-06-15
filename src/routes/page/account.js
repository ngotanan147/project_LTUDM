const express = require('express')
const router = express.Router()

const accountController = require("../../app/controllers/AccountController")

router.get('/', accountController.index)
router.get('/getBill', accountController.getBill)
router.get('/getBillDetail/:id', accountController.getBillDetail)
router.get('/:slug', accountController.notFound)


module.exports = router