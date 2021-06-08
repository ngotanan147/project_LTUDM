const Home = require('../models/HomeModel')
const { mongooseToObject } = require('../../util/mongoose.js')


class HomesController {
    index(req, res, next) {
        res.render('home')
    }

}

module.exports = new HomesController();
