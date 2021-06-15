function format(n) {
    return (n * 1000).toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
    })
}

$('#search-form').submit(function (e) {
    const query = $('#search-form input[name=query]').val()
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/search/${query}`,
        contentType: 'application/json',
        encode: true,
    }).done(function (res) {
        render(res.product)
    })
})


function render(arr) {
    $('.search-result').html('')
    Array.from(arr).forEach(item => {
        $('.search-result').append(`
            <div class="owl_item col-lg-4 col-md-4 col-6">
                <div class="item_product_main">
                    <div class="items">
                        <div class="image">
                            <a href="">
                                <img src="img/${item.image}" alt="" width="100%" height="250px">
                            </a>
                        </div>
                        <div class="infor mt-3" style="width: 100%">
                            <h3 class="title">
                                <span>
                                    ${item.name}
                                </span>
                            </h3>
                            <div class="box_price d-flex">
                                <div>
                                    <span class="special_price">
                                        <span id="" class="prices" style="color:#ef7147;font-size: 20px;">${format(item.price)}</span>
                                    </span>
                                </div>
            
                                <div class="text-right w-100">
                                    <a class="addtocart" href="">
                                        <button id="btn-same" type="submit" class=" btn-primary">
                                            Thêm vào giỏ
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
    })
}
