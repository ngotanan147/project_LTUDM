
class AdminLogoutController {
    index(req, res, next) {
        req.session.adminLoggedIn = false
        res.redirect('/adminlogin')
    }
}


module.exports = new AdminLogoutController();
