
class LogoutController {
    index(req, res, next) {
        req.session.loggedIn = false
        res.redirect('/login')
    }

    notFound(req, res, next) {
        res.render('404notfound', { layout: false })
    }
}

module.exports = new LogoutController();
