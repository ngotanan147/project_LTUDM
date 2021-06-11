
const User = require('../../models/UserModel')


class AdminLoginController {
    index(req, res, next) {
        res.render('admin/login', { layout: false })
    }

    async login(req, res, next) {
        const user = await User.findOne({ email: req.body.email })
        try {
            if (!user || req.body.password == user.password && user.level == 1) {
                req.session.adminLoggedIn = true
                req.session.adminId = user.id
                res.redirect('/adminuser')
            }
        } catch (err) {
            console.log("err")
            res.render('admin/login', { layout: false, msg: 'Username or password is not correct!' })
        }


    }
}

module.exports = new AdminLoginController();
