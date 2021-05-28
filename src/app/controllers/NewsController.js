class NewsController {
    index(req, res) {
        res.render('news')
    }

    show(req, res) {
        res.render("404notfound")
    }
}

module.exports = new NewsController();