
class LogoutController {
    index(req, res, next) {
        req.session.loggedIn = false
        res.redirect('/')
    }
}


module.exports = new LogoutController();
