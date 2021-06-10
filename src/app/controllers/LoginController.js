const User = require('../models/UserModel')
const { mongooseToObject } = require('../../util/mongoose.js')
const bcrypt = require('bcrypt')


class LoginController {

    index(req, res, next) {
        if (req.session.loggedIn == true) {
            res.redirect('/')
        } else {
            res.render('login', {layout: 'main.hbs'})
        }

    }

    async login(req, res, next) {
        const user = await User.findOne({ email: req.body.email })
        console.log(req.body.password)
        console.log(user.password)
        try {
            if (!user || req.body.password == user.password) {
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
