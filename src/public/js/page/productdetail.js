function format(n) {
    return (n * 1000).toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
    })
}

$(".addtocart").click(function () {
    const productId = $(this).attr("data-id")
    $.ajax({
        type: "POST",
        url: `https://ngotanan-projectweb-uit.herokuapp.com/cart/${productId}`,
        contentType: 'application/json',
        encode: true,
    }).done(function (res) {
        $("#cart-quantity").html(res.quantity)
        swal("Đã thêm vào giỏ hàng!", "", "success");
    })
})

$('#price').html(format($('#price').html()))