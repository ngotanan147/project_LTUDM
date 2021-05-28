const newsRouter = require('./news')
const siteRouter = require('./site')
const courseRouter = require('./courses')

function route(app) {

    app.use("/news", newsRouter);
    app.use("/site", siteRouter);
    app.use("/courses", courseRouter);


    app.get('/', (req, res) => {
        res.render('home')
    })

    app.get('/product', (req, res) => {
        res.render('product')
    })
}

module.exports = route;