const express = require('express')
const router = express.Router()

const adminProductController = require("../../app/controllers/admin/AdminProductController")

router.get('/', adminProductController.index)
router.post('/create', adminProductController.create)
router.delete('/:id', adminProductController.delete)
router.put('/:id', adminProductController.update)
router.get("/:slug", adminProductController.index)

module.exports = router