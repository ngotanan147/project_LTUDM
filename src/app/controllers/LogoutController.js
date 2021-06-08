
class LogoutController {
    index(req, res, next) {
        req.session.destroy()
        res.redirect('/')
    }
}


module.exports = new LogoutController();
