
class AdminLogoutController {
    index(req, res, next) {
        req.session.adminLoggedIn = false
        res.redirect('/admin')
    }
}


module.exports = new AdminLogoutController();
