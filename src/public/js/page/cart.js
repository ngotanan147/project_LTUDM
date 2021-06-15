
var items = []

$.ajax({
    type: "GET",
    url: `http://localhost:3000/cart/getCart`,
    contentType: 'application/json',
    encode: true,
}).done(function (res) {
    items = res.cart
    render();
})

function format(n) {
    return (n * 1000).toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
    })
}

function remove(index) {
    items.splice(index, 1);
    render();
}

function updateQuantity(index, quantity) {
    if (quantity < 1) {
        items[index].quantity = 1;
        render();
        return;
    }
    items[index].quantity = quantity;
    render();
}

function emptyCartMessage() {
    if ($(".form").hasClass("hide")) {
        $(".form").removeClass("hide");
        $(".giohangtrong").addClass("hide");
    } else {
        $(".form").addClass("hide");
        $(".giohangtrong").removeClass("hide");
    }
}

$("#btn_pay").click(function () {
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/cart/pay`,
        contentType: 'application/json',
        encode: true,
    }).done(function (res) {
        if (res.status == true && res.logged == false) {
            swal("Thanh toán thành công!", "", "success")
            setTimeout(function () {
                window.location.href = "http://localhost:3000/"
            }, 1500)
        } else {
            swal("Thanh toán thành công!", "", "success")
            setTimeout(function () {
                window.location.href = "http://localhost:3000/account"
            }, 1500)
        }
    })
})

function sumQuantity(arr) {
    var sum = 0
    for (let index = 0; index < arr.length; index++) {
        sum += arr[index].quantity
    }
    return sum
}
function sumPrice(arr) {
    var sum = 0
    for (let index = 0; index < arr.length; index++) {
        sum += arr[index].quantity * arr[index].price
    }
    return sum
}

function render() {
    if (items.length == 0) {
        emptyCartMessage();
    }
    let subTotal = 0;
    items.forEach(item => {
        subTotal += (item.quantity * item.price);
    })

    const html = items.map(item => `
                        <tr id="product${item._id}">
                            <th scope="row">
                                <img src="img/${item.image}" alt="" width="75" height="auto">
                            </th>
                            <td>${item.name}</td>
                            <td>    
                                <span id="dongia">${format(item.price)}</span>
                            </td>
                            <td>
                                <div class="congtru">
                                    <button class="inc" data-id="${item._id}">+</button>
                                    <input class="${item._id}quantityInput" type="text" value="${item.quantity}" style="width:35px">
                                    <button class="dec" data-id="${item._id}">-</button>
                                </div>
                            </td>
                            <td>
                                <span id="thanhtien">${format(item.quantity * item.price)}</span>
                            </td>
                            <td>
                                <a class="deletee" data-id="${item._id}">
                                    <button id="deleteButton">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </a>
                            </td>
                        </tr>
                        `).join('');
    const htmlMoble = items.map(item => ` 
                    <div class="d-flex justify-content-between mb-4">
                        <div class="d-flex">
                            <div>
                                <img src="img/${item.img}" alt="" width="75" height="auto">
                            </div>
                            <div class="tenvagia pl-3">
                                <div class="mb-1">
                                    <span class="mb-3" style="width: 200px;">${item.name}</span>
                                </div>
                                <div>
                                    <span>Giá: </span> <span style="color: #ef7147">${format(item.price)}</span>
                                </div>
                                <div>
                                    <span>Thành tiền: </span> <span style="color: #ef7147">${format(item.quantity * item.price)}</span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-4">
                            <div class="congtru">
                                <button id="inc2">+</button>
                                <input id="quantity2" type="text" value="${item.quantity}" style="width:35px">
                                <button id="dec2">-</button>
                            <a href="${item._id}">
                                <button id="deleteButton2">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </a>
                            
                            </div>
                        </div>  
                    </div>`).join('');

    $("#order_items_mobile").html(htmlMoble)
    $("#order_items").html(html)

    $(".total-price").html(format(sumPrice(items)))

    $(".inc").click(function () {
        var id = $(this).attr("data-id")
        var item = items.filter(obj => {
            return obj._id == id
        })
        const index = items.indexOf(item[0]);
        items[index].quantity++
        $("#cart-quantity").html(sumQuantity(items))
        render()

        $.ajax({
            type: "POST",
            url: `http://localhost:3000/cart/updateCart/${item[0]._id}/plus`,
            contentType: 'application/json',
            encode: true,
        }).done(function (res) {
        })
    })

    $(".dec").click(function () {
        var id = $(this).attr("data-id")
        var item = items.filter(obj => {
            return obj._id == id
        })
        const index = items.indexOf(item[0]);
        items[index].quantity--
        $("#cart-quantity").html(sumQuantity(items))
        if (items[index].quantity == 0) {
            $("#product" + id).remove()
            items = items.filter(obj => {
                return obj._id !== id
            })
        } else {
            render()
        }

        if (items.length == 0) {
            emptyCartMessage()
        }

        $.ajax({
            type: "POST",
            url: `http://localhost:3000/cart/updateCart/${item[0]._id}/minus`,
            contentType: 'application/json',
            encode: true,
        }).done(function (res) {
        })
    })

    $(".deletee").click(function () {
        const id = $(this).attr("data-id")
        var item = items.filter(obj => {
            return obj._id == id
        })
        items = items.filter(obj => {
            return obj._id !== id
        })
        $("#cart-quantity").html(sumQuantity(items))
        render()

        $.ajax({
            type: "DELETE",
            url: `http://localhost:3000/cart/${id}/`,
            contentType: 'application/json',
            encode: true,
        }).done(function (res) {
        })
    })
}
