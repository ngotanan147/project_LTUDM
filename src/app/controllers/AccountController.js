const User = require('../models/UserModel')
const Bill = require('../models/BillModel')
const BillDetail = require('../models/BillDetail')
const { mongooseToObject, getQuantity, checkLoginForOption, multipleMongooseToObject } = require('../../util/mongoose.js')
var mongoose = require('mongoose')
const sharp = require('sharp')
var fs = require('fs');



class AccountController {
    async index(req, res, next) {
        const userId = mongoose.Types.ObjectId(req.session.userId)
        var quantity = getQuantity(req.cookies.cart)
        var lst = checkLoginForOption(req.session)
        var user = await User.findOne({ _id: userId })
        user = mongooseToObject(user)

        res.render('account', {
            layout: 'main.hbs',
            quantity: quantity,
            css: "account.css",
            js: "account.js",
            email: user.email,
            avatar: user.avatar,
            loginAccount: lst[0],
            registerLogout: lst[1]
        })
    }

    async getBill(req, res, next) {
        var bill = await Bill.find({ userId: req.session.userId })
        bill = multipleMongooseToObject(bill)

        res.send({ bill: bill })
    }

    async getBillDetail(req, res, next) {
        const billId = req.params.id
        var billDetail = await BillDetail.find({ billId: billId })
        billDetail = multipleMongooseToObject(billDetail)

        res.send({ billDetail: billDetail })
    }

    async changeAvatar(req, res, next) {
        var query = { _id: req.session.userId }
        var img_name = req.session.userId + '_200x200.jpg'
        var path = './src/public/img/users/' + req.session.userId + '.jpg'
        var resizedImg = './src/public/img/users/' + req.session.userId + '_200x200.jpg'

        //rename image to userid
        fs.renameSync('./src/public/img/users/' + req.file.filename, path)

        //resize
        sharp(path).resize(200, 200).toFile(resizedImg, function (err) {
            if (err) {
                console.log(err)
                return
            }
        })

        const userr = await User.findOneAndUpdate(query, { $set: { avatar: req.session.userId + '.jpg' } })
        userr.save()

        // res.send({ status: true, image: img_name })
        res.redirect('/account')
    }

    async deleteAvatar(req, res, next) {
        var query = { _id: req.session.userId }
        const userr = await User.findOneAndUpdate(query, { $set: { avatar: 'default.jpg' } })
        userr.save()
        res.send({ status: true, image: 'default.jpg' })
    }

    notFound(req, res, next) {
        res.render('404notfound', { layout: false })
    }

}

module.exports = new AccountController();
