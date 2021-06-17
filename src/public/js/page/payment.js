// function format(n) {
//     return (n * 1000).toLocaleString('vi', {
//         style: 'currency',
//         currency: 'VND'
//     })
// }
// var array = []
// $.ajax({
//     type: "GET",
//     url: 'http://localhost:3000/cart/getCart',
//     contentType: 'application/json',
//     encode: true,
// }).done(function (res) {
//     console.log(res.cart)
//     var item = Array.from(res.cart).map(item => `
//         <tbody>
//                 <tr>
//                     <td>${item.name}</td>
//                     <td>${item.quantity}</td>
//                     <td>${format(item.price)}</td>
//                 </tr>
//         </tbody>
//         `).join('');

//     var bd = `<table style="width:500px; text-align:center" cellspacing=”0” cellpadding=”0” width=”640” align=”center” border=”1”>
//     <thead>
//         <tr>
//             <th>Tên sản phẩm</th>
//             <th>Số lượng</th>
//             <th>Giá</th>
//         </tr>
//     </thead>` + item + `<tfoot>
//         <tr>
//                 <th colspan="2">
//                     <div class="text-left">
//                         <h4 style="color: #ef7147;margin-top: 13px">Tổng tiền cần thanh toán:</h4>
//                     </div>
//                 </th>
//                 <th>
//                     <span class="pl-2" style="color: #ef7147; font-size: 18px;" id="total"></span>
//                 </th>
//         </tr>
//     </tfoot>
//     </table> `;

//     $("#btn_pay").click(function () {
//         email = $("#email-for-bill").val();
//         Email.send({
//             Host: "smtp.gmail.com",
//             Username: "nta.projectweb@gmail.com",
//             Password: "emgasolo2",
//             SecureToken: "Generate token here",
//             From: "nta.projectweb@gmail.com",
//             To: email,
//             Subject: "You've ordered from Delicious!",
//             Body: bd
//         }).then(function (response) {
//             if (response == 'OK') {
//                 swal("Chúng tôi đã gửi hóa đơn đến email của bạn!", "", "success");
//                 // window.setTimeout(function () {
//                 //     window.location.href = "http://localhost:3000/"
//                 // }, 2000);
//             } else {
//                 swal(response, "", "error");
//             }
//         });
//     })
// })



// var total = 0;
// array.forEach(item => {
//     $("#price" + item.id).html(format(item.price));

//     $("#total" + item.id).html(format(item.price * item.quantity));
//     total += item.price * item.quantity;
//     $("#total").html(format(total));
// })
// console.log(array)

// console.log(item)    


