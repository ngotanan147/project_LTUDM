const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const registerRouter = require('./page/register')
const loginRouter = require('./page/login')
const logoutRouter = require('./page/logout')
const homeRouter = require('./page/home')
const cartRouter = require('./page/cart')
const accountRouter = require('./page/account')
const productRouter = require('./page/product')
const searchRouter = require('./page/search')
const productdetailRouter = require('./page/productdetail')
//Admin
const adminUserRouter = require('./admin/user')
const adminRegisterRouter = require('./admin/register')
const adminLoginRouter = require('./admin/login')
const adminLogoutRouter = require('./admin/logout')
const adminProductRouter = require('./admin/product')
const adminStatistic = require('./admin/statistic')

var debug = require("debug")("app.js")


function route(app) {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cookieParser())

    app.use(session({
        secret: "mysecret",
        name: "delicious",
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 60 * 24 * 30 }
    }))

    //page
    app.get('/', (req, res) => {
        res.redirect('/home')
    })
    app.use('/login', checkNotLoggedIn, loginRouter)
    app.use('/logout', checkLoggedIn, logoutRouter)
    app.use('/register', checkNotLoggedIn, registerRouter)
    app.use('/home', homeRouter)
    app.use('/cart', cartRouter)
    app.use('/account', checkLoggedIn, accountRouter)
    app.use('/product', productRouter)
    app.use('/search', searchRouter)
    app.use('/productdetail', productdetailRouter)

    //admin
    app.use('/adminregister', checkNotLoggedInAdmin, adminRegisterRouter);
    app.use('/adminlogin', checkNotLoggedInAdmin, adminLoginRouter);
    app.use('/adminlogout', adminLogoutRouter);
    app.use('/adminuser', checkLoggedInAdmin, adminUserRouter);
    app.use('/adminproduct', checkLoggedInAdmin, adminProductRouter);
    app.use('/adminstatistic', checkLoggedInAdmin, adminStatistic);


}

const checkLoggedIn = (req, res, next) => {
    if (req.session.loggedIn) {
        debug(
            "checkLoggedIn(), req.session.loggedIn:",
            req.session.loggedIn,
            "executing next()"
        );
        next();
    } else {
        debug(
            "checkLoggedIn(), req.session.loggedIn:",
            req.session.loggedIn,
            "rendering login"
        );
        res.render("login", { layout: 'main.hbs' });
    }
}

const checkNotLoggedIn = (req, res, next) => {
    if (!req.session.loggedIn) {
        next()
    } else {
        res.redirect('/');
    }
}

const checkLoggedInAdmin = (req, res, next) => {
    if (req.session.adminLoggedIn) {
        next()
    } else {
        res.render("admin/login", { layout: false });
    }
}

const checkNotLoggedInAdmin = (req, res, next) => {
    if (!req.session.adminLoggedIn) {
        next()
    } else {
        res.render("admin/user", { layout: 'admin.hbs' });
    }
}

module.exports = route;