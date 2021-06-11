const User = require('../models/UserModel')
const { mongooseToObject } = require('../../util/mongoose.js')
const bcrypt = require('bcrypt')


class LoginController {

    index(req, res, next) {
        if (req.session.loggedIn == true) {
            res.redirect('/')
        } else {
            res.render('login', { layout: 'main.hbs' })
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
