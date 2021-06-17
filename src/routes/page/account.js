const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/img/users/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '.jpg')
    }
})
var upload = multer({ storage: storage })



const accountController = require("../../app/controllers/AccountController")

router.get('/', accountController.index)
router.get('/getBill', accountController.getBill)
router.get('/getBillDetail/:id', accountController.getBillDetail)
router.post('/changeAvatar', upload.single('avatar'), accountController.changeAvatar)
router.delete('/', accountController.deleteAvatar)
router.get('/:slug', accountController.notFound)


module.exports = router