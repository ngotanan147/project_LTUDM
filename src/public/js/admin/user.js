

$('.modal-form').submit(function (e) {
    const formData = {
        email: $('.modal-form input[name=email]').val(),
        password: $('.modal-form input[name=password]').val(),
        userid: $('.modal-form input[name=userid]').val(),
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/adminuser/create",
        data: JSON.stringify(formData),
        contentType: 'application/json',
        encode: true,
    }).done(function (res) {
        $("#table").append(`
    
        `)

    })

    e.preventDefault();
})

// $('.id_100 option[value=val2]').attr('selected','selected');
