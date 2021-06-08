const User = require('../models/UserModel');
const bcrypt = require('bcrypt')
const { multipleMongooseToObject } = require('../../util/mongoose.js')

class RegisterController {
    index(req, res, next) {
        res.render("register")
    }

    //[POST]
    async register(req, res, next) {
        try {
            const formData = req.body
            formData.avatar = "default.jpg"
            formData.level = 0
            console.log(formData)

            const user = new User(formData)
            user.save()

            res.redirect('/login')
        } catch(e) {
            res.redirect('/register')
        }
    }
}

module.exports = new RegisterController();