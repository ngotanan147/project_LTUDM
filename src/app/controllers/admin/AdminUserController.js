const User = require('../../models/UserModel')
const { mongooseToObject } = require('../../../util/mongoose.js')


class AdminUserController {
    index(req, res, next) {
        res.render('admin/user', {layout: 'admin.hbs'})
    }

}

module.exports = new AdminUserController();
