console.log('login')

$('#form-login').submit(function (e) {
    e.preventDefault()
    const formData = {
        email: $('#form-login input[name=email]').val(),
        password: $('#form-login input[name=password]').val()
    }

    $.ajax({
        type: "POST",
        url: `http://localhost:3000/login`,
        contentType: 'application/json',
        data: JSON.stringify(formData),
        encode: true,
    }).done(function (res) {
        console.log(res)
        if (res.status == true) {
            window.location.href = 'http://localhost:3000/'
        } else {
            $('#login-error').html(res.msg)
            swal("Login failed :(", "", "error")
        }
    })
})