const User = require('../../models/UserModel')
const { multipleMongooseToObject } = require('../../../util/mongoose.js')


class AdminUserController {
    index(req, res, next) {
        User.find({})
            .then(user => {
                res.render('admin/user', { layout: 'admin.hbs', user: multipleMongooseToObject(user) })
            })
            .catch(next)
    }

    async create(req, res, next) {
        try {
            const _user = await User.findOne({ email: formData.email }).exec();
            if (!_user) {
                const formData = req.body
                formData.avatar = "default.jpg"

                const user = new User(formData)
                user.save()
                res.send({ status: true, data: formData })
            } else {
                res.send({ status: false })
            }
        } catch (err) {
            res.send(err)
        }

    }

}

module.exports = new AdminUserController();
