function deletee() {
    return (
        $(".delete-btn").click(function (e) {
            e.preventDefault();
            const id = $(this).attr('data-id')
            $.ajax({
                type: "DELETE",
                url: `http://localhost:3000/adminuser/${id}`,
                contentType: "application/json",
                encode: true,
            }).done(function (res) {
                $("#" + id + "_row").remove();
            })
        })
    )
}

function clear() {
    $("form-create input=[name=email]").val("")
    $("form-create input=[name=password]").val("")
    $("#select1").prop("selected", "selected")
}

function update() {
    return (
        $(".update-btn").click(function () {
            var id = $(this).attr("data-id")
            var email = $("." + id + "_email").html()
            var level = $("." + id + "_level").html()
            $(".update-form input[name=email]").val(email)
            $(".getId").html(id)

            if (level == 0) {
                $(".update-option1").prop("selected", "selected")
            } else {
                $(".update-option2").prop("selected", "selected")
            }
        })
    )
}
$(".add-button").click(function () {
    clear()
})
deletee()
update()



$('.modal-form').submit(function (e) {
    e.preventDefault();
    const formData = {
        email: $('.modal-form input[name=email]').val(),
        password: $('.modal-form input[name=password]').val(),
        level: $('#select1 option:selected').val(),
    }
    console.log(formData)
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/adminuser/create",
        data: JSON.stringify(formData),
        contentType: 'application/json',
        encode: true,
    }).done(function (res) {
        $("#dataTable tbody ").append(`
        <tr id="${res.data._id}_row">
            <td class="${res.data._id}_id">${res.data._id}</td>
            <td class="${res.data._id}_email">${res.data.email}</td>
            <td class="text-center"><img style="width: 75px; height: 75px"
            src="img/users/${res.data.avatar}" alt=""></td>
            <td class="${res.data._id}_level">${res.data.level}</td>
            <td class="d-flex justify-content-around">
                <a href="/adminuser/update" class="update-btn" data-id="${res.data._id}"
                    data-toggle="modal" data-target="#exampleModal2">
                    <i style="color:#999" class="fa fa-wrench fa-lg function"
                    aria-hidden="true"></i>
                </a>
                <a href="/adminuser/delete" data-id="${res.data._id}" class="delete-btn">
                    <i style="color:#999" class="fa fa-trash fa-lg function"
                    aria-hidden="true"></i>
                </a>
            </td>
        </tr>
        `)
        $(".modal-footer .buttonnn").click()
        deletee()
        update()
    })
})

$(".update-form").submit(function (e) {
    e.preventDefault()
    const formData = {
        id: $('.getId').html(),
        // email: $('.update-form input[name=email]').val(),
        level: $('#select2 option:selected').val(),
    }
    const id = $(".getId").html()
    $.ajax({
        type: "PUT",
        url: `http://localhost:3000/adminuser/${id}`,
        data: JSON.stringify(formData),
        contentType: 'application/json',
        encode: true,
    }).done(function (res) {
        $("." + res.data._id + "_level").html(formData.level)
        $('#modalEdit').click()
    })

})
// $('.id_100 option[value=val2]').attr('selected','selected');
