module.exports = {
    multipleMongooseToObject: function (mongooseArrays) {
        return mongooseArrays.map(mongooseArray => mongooseArray.toObject())
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose
    },
    getQuantity: function (arr) {
        var quantity = 0
        if (arr !== undefined) {
            for (let index = 0; index < arr.length; index++) {
                quantity += arr[index].quantity
            }
        } else {
            quantity = 0
        }

        return quantity
    },
    checkLoginForOption: function (session) {
        lst = []
        if (session.loggedIn) {
            var loginAccount = `<a href="/account">Tài khoản</a>`
            var registerLogout = `<a href="/logout">Đăng xuất</a>`
        } else {
            var loginAccount = `<a href="/login">Đăng nhập</a>`
            var registerLogout = `<a href="/register">Đăng kí</a>`
        }

        return [loginAccount, registerLogout]
    }
}