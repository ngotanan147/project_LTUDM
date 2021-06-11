
class LogoutController {
    index(req, res, next) {
        req.session.loggedIn = false
        res.redirect('/login')
    }
}

module.exports = new LogoutController();
