function format(n) {
    return (n * 1000).toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
    })
}

$.ajax({
    type: "GET",
    url: `http://localhost:3000/account/getBill`,
    contentType: 'application/json',
    encode: true,
}).done(function (res) {
    var array = res.bill
    if (array.length == 0) {
        $('#bill').html("")
        $('#bill').append(`<h2>Hóa đơn trống</h2>`)
        $('#bill').css("text-align", "center")
        return
    }
    array.forEach(item => {
        $('.tdody_content').append(`
            <tr>
                <td>
                    ${array.indexOf(item) + 1}
                </td>
                <td>
                    ${item._id}
                </td>
                <td class="createdAt">
                    ${item.createdAt}
                </td>
                <td class="price">
                    ${format(item.totalPrice)}
                </td>
                <td>
                    <a data-id="${item._id}" class="xemchitiet" data-toggle="modal" href="" data-target="#exampleModalCenter1">
                        Xem chi tiết
                    </a>
                </td>
            </tr>
        `)
    })

    $('.xemchitiet').click(function (event) {
        event.preventDefault()
        const id = $(this).attr("data-id")
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/account/getBillDetail/${id}`,
            contentType: 'application/json',
            encode: true,
        }).done(function (res) {
            console.log(res)
            var array = res.billDetail
            $('#cthd_modal').html("")
            $('#cthd_modal').append(`
                <table class="table table-bordered table-hover text-center cthd_table" style="font-size: 16px">
                    <thead class="">
                        <tr id="cthd_tr">
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Hình ảnh</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody id="cthd_tbody">
                       
                    </tbody>
                </table>
            `)

            array.forEach(item => {
                $('#cthd_tbody').append(`
                    <tr>
                        <td>
                            ${array.indexOf(item) + 1}
                        </td>
                        <td>
                            ${item.productName}
                        </td>
                        <td>
                            <img style="width: 75px; height: 75px" src="img/${item.image}" alt="">
                        </td>
                        <td>
                            ${item.quantity}
                        </td>
                        <td>
                            ${format(item.price)}
                        </td>
                        <td>
                            ${format(item.price * item.quantity)}
                        </td>
                    </tr>
                `)
            })
        })
    })
})
// function submitAvatar(value) {
//     return (
//         $('#changeAvatar').submit(function () {
//             const formData = {
//                 avatar: $('#changeAvatar input[name=avatar]')
//             }
//             $.ajax({
//                 type: "POST",
//                 url: 'http://localhost:3000/account/changeAvatar',
//                 data: JSON.stringify(avatar),
//                 contentType: 'application/json',
//                 encode: true,
//             }).done(function (res) {
//                 render(res.product)
//             })
//         })
//     )
// }

// $('#changeAvatarr').click(function (e) {
//     const formData = {
//         avatar: $('#changeAvatar input[name=avatar]')
//     }
//     $.ajax({
//         type: "POST",
//         url: 'http://localhost:3000/account/changeAvatar',
//         data: JSON.stringify(formData),
//         contentType: 'application/json',
//         encode: true,
//     }).done(function (res) {
//         render(res.product)
//     })
// })

$('#deleteAvatar').click(function (e) {
    $.ajax({
        type: "DELETE",
        url: 'http://localhost:3000/account',
        contentType: 'application/json',
        encode: true,
    }).done(function (res) {
        console.log(res.image)
        $('#avatar-image').attr('src', 'img/users/' + res.image)
    })

    $('.close-modal').click()
})


$(".createdAt").html($(".createdAt").html().replace(" GMT+0700 (Indochina Time)", ""))