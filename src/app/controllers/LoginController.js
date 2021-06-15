const User = require('../models/UserModel')
const { mongooseToObject, getQuantity, checkLoginForOption } = require('../../util/mongoose.js')
const bcrypt = require('bcrypt')


class LoginController {

    index(req, res, next) {
        var quantity = getQuantity(req.cookies.cart)
        var lst = checkLoginForOption(req.session)
        if (req.session.loggedIn == true) {
            res.redirect('/')
        } else {
            res.render('login', {
                layout: 'main.hbs',
                quantity: quantity,
                loginAccount: lst[0],
                registerLogout: lst[1]
            })
        }

    }

    async login(req, res, next) {
        const user = await User.findOne({ email: req.body.email })
        try {
            if (!user || req.body.password == user.password && user.level == 0) {
                req.session.loggedIn = true
                req.session.userId = user.id
                res.redirect("/")
            }
        } catch (err) {
            res.render("login", { msg: 'Username or password is not correct!' })
        }
    }
}


module.exports = new LoginController();
