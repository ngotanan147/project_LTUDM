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
            const _user = await User.findOne({ email: req.body.email }).exec();
            if (!_user) {
                const formData = req.body
                formData.avatar = "default.jpg"
                if (req.body.level == "User") {
                    formData.level = 0
                } else {
                    formData.level = 1
                }

                const user = new User(formData)
                user.save()
                res.send({ status: true, data: user })
            } else {
                res.send({ status: false })
            }
        } catch (err) {
            res.send(err)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await User.deleteOne({ _id: id })
            res.send({ status: true })
        } catch (err) {
            res.send({ status: false })
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const level = req.body.level
            const query = { _id: id }
            await User.findOneAndUpdate(query, { $set: { level: level } })
                .then(user => {
                    res.send({ status: true, data: user })
                })
                .catch(next)
        } catch (err) {
            res.send({ status: false })
        }
    }

}

module.exports = new AdminUserController();
