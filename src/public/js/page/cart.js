const items = []

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

function render() {
    if (items.length == 0) {
        emptyCartMessage();
    }
    let subTotal = 0;
    items.forEach(item => {
        subTotal += (item.quantity * item.price);
    })

    const html = items.map(item => `
                        <tr id="product${item.id}">
                            <th scope="row">
                                <img src="./mvc/assets/img/${item.img}" alt="" width="75" height="auto">
                            </th>
                            <td>${item.name}</td>
                            <td>
                                <span id="dongia">${format(item.price)}</span>
                            </td>
                            <td>
                                <div class="congtru">
                                    <button id="inc" class="${item.id}">+</button>
                                    <input class="${item.id}" name="quantity[${item.id}]" id="quantity1" type="text" value="${item.quantity}" style="width:35px">
                                    <button id="dec" class="${item.id}">-</button>
                                </div>
                            </td>
                            <td>
                                <span id="thanhtien">${format(item.quantity * item.price)}</span>
                            </td>
                            <td>
                                <a class="deletee" href="<?php echo URL ?>Cart/delete/${item.id}">
                                    <button id="deleteButton">
                                        <i class="fa fa-trash-o"></i>
                                    </button>
                                </a>
                            </td>
                        </tr>
                        `).join('');
    const htmlMoble = items.map(item => ` 
                    <div class="d-flex justify-content-between mb-4">
                        <div class="d-flex">
                            <div>
                                <img src="./mvc/assets/img/${item.img}" alt="" width="75" height="auto">
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
                                <input name="quantity[${item.id}]" id="quantity2" type="text" value="${item.quantity}" style="width:35px">
                                <button id="dec2">-</button>
                            <a href="<?php echo URL ?>Cart/delete/${item.id}">
                                <button id="deleteButton2">
                                    <i class="fa fa-trash-o"></i>
                                </button>
                            </a>
                            
                            </div>
                        </div>
                    </div>`).join('');

    $("#order_items_mobile").html(htmlMoble);
    $("#order_items").html(html);

    const incs = document.querySelectorAll("#inc");
    const decs = document.querySelectorAll("#dec");
    const incs2 = document.querySelectorAll("#inc2");
    const decs2 = document.querySelectorAll("#dec2");
    const quantitys1 = document.querySelectorAll("#quantity1");
    const quantitys2 = document.querySelectorAll("#quantity2");

    //Delete item
    $(".deletee").click(function (event) {
        event.preventDefault();
        var href = $(this).attr("href");
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200) {
                    //Hứng dữ liệu
                    arr = xhr.responseText.trim().split("/");
                    console.log(arr);
                    console.log(items);

                    //Tìm index của item cần xóa trong giỏ hàng
                    var result = $.grep(items, function (e) {
                        return e.id == arr[0];
                    });

                    //Xóa item thông qua index
                    remove(items.indexOf(result[0]));
                    $("#soluong").html(arr[1]);

                    if (arr[1] === 0) {
                        emptyCartMessage();
                        $("#soluong").html(0);
                    }

                    if (typeof (arr[1]) == 'undefined') {
                        $("#soluong").html(0);
                    }
                }
            }
        }

        xhr.open('GET', href, true);
        xhr.send();
    })

    for (let i = 0; i < incs.length; i++) {

        if (incs[i]) {
            incs[i].addEventListener('click', () => {
                updateQuantity(i, items[i].quantity + 1);
                var inputName = 'quantity[' + incs[i].className + ']';
                var value = $("[name='" + inputName + "']").val();
                var product_id = incs[i].className;
                var href = "<?php echo URL ?>Cart/update/" + product_id + "/" + value;

                var xhr = new XMLHttpRequest();

                xhr.onload = function () {
                    if (xhr.readyState === xhr.DONE) {
                        if (xhr.status === 200) {
                            //Hứng dữ liệu
                            arr = xhr.responseText.trim().split("/");
                            $("#soluong").html(arr[1]);
                        }
                    }
                }

                xhr.open('GET', href, true);
                xhr.send();
            });
        }

        if (decs[i]) {
            decs[i].addEventListener('click', () => {
                updateQuantity(i, items[i].quantity - 1);
                var inputName = 'quantity[' + incs[i].className + ']';
                var value = $("[name='" + inputName + "']").val();
                var product_id = incs[i].className;
                var href = "<?php echo URL ?>Cart/update/" + product_id + "/" + value;

                var xhr = new XMLHttpRequest();

                xhr.onload = function () {
                    if (xhr.readyState === xhr.DONE) {
                        if (xhr.status === 200) {
                            //Hứng dữ liệu
                            arr = xhr.responseText.trim().split("/");
                            $("#soluong").html(arr[1]);
                        }
                    }
                }

                xhr.open('GET', href, true);
                xhr.send();
            });
        }

        if (incs2[i]) {
            incs2[i].addEventListener('click', () => {
                updateQuantity(i, items[i].quantity + 1);
            });
        }

        if (decs2[i]) {
            decs2[i].addEventListener('click', () => {
                updateQuantity(i, items[i].quantity - 1);
            });
        }

        if (quantitys1[i]) {
            quantitys1[i].addEventListener('change', () => {
                if (isNaN(quantitys1[i].value) || quantitys1[i].value < 1) {
                    quantitys1[i].value = 1;
                }
                updateQuantity(i, parseInt(quantitys1[i].value));
                var product_id = quantitys1[i].className;
                var href = "<?php echo URL ?>Cart/update/" + product_id + "/" + quantitys1[i].value;
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.readyState === xhr.DONE) {
                        if (xhr.status === 200) {
                            //Hứng dữ liệu
                            arr = xhr.responseText.trim().split("/");
                            console.log(arr);
                            $("#soluong").html(arr[1]);
                        }
                    }
                }

                xhr.open('GET', href, true);
                xhr.send();
            });
        }
        if (quantitys2[i]) {
            quantitys2[i].addEventListener('change', () => {
                if (isNaN(quantitys2[i].value) || quantitys2[i].value < 1) {
                    quantitys2[i].value = parseInt(1);
                }
                updateQuantity(i, parseInt(quantitys2[i].value));
            });
        }
    }

    const total = subTotal;
    $(".total").text(`${format(total)}`);
}

render();