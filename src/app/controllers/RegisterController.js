const User = require('../models/UserModel');
const { mongooseToObject, getQuantity, checkLoginForOption } = require('../../util/mongoose.js')

class RegisterController {
    index(req, res, next) {
        var quantity = getQuantity(req.cookies.cart)
        var lst = checkLoginForOption(req.session)

        res.render("register", {
            layout: "main.hbs",
            js: "register.js",
            quantity: quantity,
            loginAccount: lst[0],
            registerLogout: lst[1]
        })
    }

    //[POST]
    async register(req, res, next) {
        try {
            const formData = req.body
            var check = await User.find({ email: formData.email })
            check = mongooseToObject(check)
            if (check) {
                formData.avatar = "default.jpg"
                formData.level = 0

                const user = new User(formData)
                user.save()
                res.send({ status: true, msg: 'register successfully!' })
            } else {
                res.send({ status: false, msg: 'register fail :(' })
            }

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new RegisterController();