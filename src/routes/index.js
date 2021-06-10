const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')
const User = require('../app/models/UserModel')

const courseRouter = require('./page/courses')
const registerRouter = require('./page/register')
const loginRouter = require('./page/login')
const logoutRouter = require('./page/logout')
const homeRouter = require('./page/logout')
//Admin
const adminUserRouter = require('./admin/user')
const adminRegisterRouter = require('./admin/register')
const adminLoginRouter = require('./admin/login')
const adminLogoutRouter = require('./admin/logout')
const { render } = require('node-sass')

var debug = require("debug")("app.js")
//const initializePassport = require('../config/passport/passport-config.js')


function route(app) {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(session({
        secret: "mysecret",
        name: "delicious",
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 60 * 24 * 30 }
    }))


    app.use('/login', loginRouter)
    app.use('/logout', logoutRouter)
    app.use('/register', registerRouter)
    app.get('/', checkLoggedIn, (req, res) => {
        res.render('home')
    })
    app.use('/home', checkLoggedIn, homeRouter)
    app.use('/courses', checkLoggedIn, courseRouter);
    //admin
    app.use('/admin', checkLoggedInAdmin, adminUserRouter);
    app.use('/adminregister', adminRegisterRouter);
    app.use('/adminlogin', adminLoginRouter);
    app.use('/adminlogout', adminLogoutRouter);


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

const checkLoggedInAdmin = (req, res, next) => {
    if (req.session.adminLoggedIn == true) {
        next()
    } else {
        res.render("admin/login", { layout: false });
    }
}

module.exports = route;