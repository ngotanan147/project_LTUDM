// function toVND(number) {
//     return (number * 1000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
// }
// { { each } }
// $(".product-price").html(toVND(parseInt($(".product-price").html())))

$(".addToCart").click(function () {
    const productId = $(this).attr("data-id");
    $.ajax({
        type: "POST",
        url: `http://localhost:3000/cart/${productId}`,
        contentType: 'application/json',
        encode: true,
    }).done(function (res) {
        $("#cart-quantity").html(res.quantity)
        swal("Đã thêm vào giỏ hàng!", "", "success");
    })
})