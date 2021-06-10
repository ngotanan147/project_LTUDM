const User = require('../../models/UserModel')
const { mongooseToObject } = require('../../../util/mongoose.js')


class AdminRegisterController {
    index(req, res, next) {
        res.render('admin/register', { layout: false })
    }

    async register(req, res, next) {
        try {
            const formData = req.body
            formData.avatar = "default.jpg"
            formData.level = 1

            const user = new User(formData)
            user.save()

            res.redirect('/adminlogin')
        } catch (e) {
            res.redirect('/adminregister')
        }
    }

}

module.exports = new AdminRegisterController();
