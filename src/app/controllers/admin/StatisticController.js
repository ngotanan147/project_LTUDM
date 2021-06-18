const User = require('../../models/UserModel')
const Product = require('../../models/ProductModel')
const Bill = require('../../models/BillModel')
const { mongooseToObject, multipleMongooseToObject } = require('../../../util/mongoose.js')


class AdminUserController {
    async index(req, res, next) {
        var countProduct = await Product.count({})
        var countUser = await User.count({})
        var countBill = await Bill.count({})
        var totalPrice = 0
        await Bill.find({})
            .then(bill => {
                Array.from(bill).forEach(item => {
                    console.log(item)
                    totalPrice += item.totalPrice
                })
            })
            .catch(next)
        res.render('admin/statistic', {
            layout: 'admin.hbs',
            countUser: countUser,
            countProduct: countProduct,
            countBill: countBill,
            totalPrice: totalPrice
        })
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



}

module.exports = new AdminUserController();
