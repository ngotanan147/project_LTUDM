const User = require('../models/UserModel');
const bcrypt = require('bcrypt')
const { multipleMongooseToObject, getQuantity, checkLoginForOption } = require('../../util/mongoose.js')

class RegisterController {
    index(req, res, next) {
        var quantity = getQuantity(req.cookies.cart)
        var lst = checkLoginForOption(req.session)

        res.render("register", {
            layout: "main.hbs",
            quantity: quantity,
            loginAccount: lst[0],
            registerLogout: lst[1]
        })
    }

    //[POST]
    async register(req, res, next) {
        try {
            const formData = req.body
            formData.avatar = "default.jpg"
            formData.level = 0

            const user = new User(formData)
            user.save()

            res.redirect('/login')
        } catch (e) {
            res.redirect('/register')
        }
    }
}

module.exports = new RegisterController();