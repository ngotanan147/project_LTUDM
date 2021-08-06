// function toVND(number) {
//     return (number * 1000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
// }
// { { each } }
// $(".product-price").html(toVND(parseInt($(".product-price").html())))
var items = []

$.ajax({
    type: "GET",
    url: `https://ngotanan-projectweb-uit.herokuapp.com/product/getProduct`,
    contentType: 'application/json',
    encode: true,
}).done(function (res) {
    items = res.product
    Array.from(items).forEach(item => {
        $('.price' + item._id).html(format(parseInt($('.price' + item._id).html())))
    })
})

$(".addToCart").click(function () {
    const productId = $(this).attr("data-id");
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