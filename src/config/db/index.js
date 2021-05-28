const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/demo_dev', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Database connected!!!")
    } catch (e) {
        console.log(e)
        console.log("Fail to connect to database!!!")
    }
}

module.exports = { connect }