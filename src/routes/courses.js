const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const coursesController = require("../app/controllers/CoursesController")

router.get('/create', coursesController.create)
router.post('/store', coursesController.store)
router.get("/:slug", coursesController.show)

module.exports = router