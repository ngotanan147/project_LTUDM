function format(n) {
    return (n * 1000).toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
    })
}

function renderAll() {
    return (
        $.ajax({
            type: "GET",
            url: 'http://localhost:3000/product/getProduct',
            contentType: 'application/json',
            encode: true,
        }).done(function (res) {
            render(res.product)
        })
    )
}
renderAll()



function render(arr) {
    $('.product_render').html('')
    Array.from(arr).forEach(item => {
        $('.product_render').append(`
            <div class="col-sm-12 col-md-12 col-lg-4 product-col mb-5">
                <div class="items">
                    <div class="picture">
                        <a href="">
                            <img src="img/${item.image}" alt="" style="max-width: 100%; height: 273px">
                        </a>
                    </div>
                    <div class="info">
                        <h3 class="title" style="margin-top:10px;">
                            ${item.name}
                        </h3>
                        <div class="price">
                            <p class="price${item.product_id}">${format(item.price)}</p>
                        </div>
                        <div class="btn2">
                            <a class="addtocart">
                                <button>Thêm vào giỏ</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `)
    })
}

function ajaxForSelect(value) {
    return (
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/product/getProductByCategory/${value}`,
            contentType: 'application/json',
            encode: true,
        }).done(function (res) {
            render(res.product)
        })
    )
}

$('#selector').change(function () {
    if ($(this).val() == 0) {
        renderAll()
    } else {
        ajaxForSelect($(this).val())
    }
});