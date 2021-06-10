const express = require('express')
const route = require('./routes')
const path = require('path')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const app = express()
const db = require('./config/db')
db.connect()

const port = 3000

route(app)

//Static config
app.use(express.static(path.join(__dirname, 'public')))
//

//Handlebars setup
app.engine('hbs', handlebars({
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))
//


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})