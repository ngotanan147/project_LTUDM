const Course = require('../models/CourseModel');
const { multipleMongooseToObject } = require('../../util/mongoose.js')

class SiteController {
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('product', { courses: multipleMongooseToObject(courses) })
            })
            .catch(next)
        // res.send("index")        
    }

    show(req, res) {
        res.send("slug")
    }
}
;
module.exports = new SiteController();