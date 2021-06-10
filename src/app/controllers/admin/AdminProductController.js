const Product = require('../../models/UserModel')
const { multipleMongooseToObject } = require('../../../util/mongoose.js')


class AdminUserController {
    index(req, res, next) {
        User.find({})
            .then(user => {
                console.log(user)
                res.render('admin/user', { layout: 'admin.hbs', user: multipleMongooseToObject(user) })
            })
            .catch(next)
    }

    addProduct(req, res, next) {

    }

}

module.exports = new AdminUserController();
