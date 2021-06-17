
// $('#search-form').submit(function (e) {
//     e.preventDefault()
//     const query = $('#search-form input[name=query]').val()
//     $.ajax({
//         type: "GET",
//         url: `http://localhost:3000/search/${query}`,
//         contentType: 'application/json',
//         encode: true,
//     }).done(function (res) {
//         console.log(res.product)
//     })
// })

// function render(arr) {
//     $('.search-result').html('')
//     Array.from(arr).forEach(item => {
//         $('.search-result').append(`
//             <div class="owl_item col-lg-4 col-md-4 col-6">
//                 <div class="item_product_main">
//                     <div class="items">
//                         <div class="image">
//                             <a href="">
//                                 <img src="img/${item.image}" alt="" width="100%" height="250px">
//                             </a>
//                         </div>
//                         <div class="infor mt-3" style="width: 100%">
//                             <h3 class="title">
//                                 <span>
//                                     ${item.name}
//                                 </span>
//                             </h3>
//                             <div class="box_price d-flex">
//                                 <div>
//                                     <span class="special_price">
//                                         <span id="" class="prices" style="color:#ef7147;font-size: 20px;">${format(item.price)}</span>
//                                     </span>
//                                 </div>
            
//                                 <div class="text-right w-100">
//                                     <a class="" href="">
//                                         <button style="background: #ef7147; border: 1px solid #ef7147" id="btn-same" type="submit" class="btn-same btn btn-primary">
//                                             Thêm vào giỏ
//                                         </button>
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `)
//     })
// }