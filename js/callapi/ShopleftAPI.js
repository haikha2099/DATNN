$(document).ready(function () {

    $("#btn-filter-a").click(function (e) {
        let price_filter = "";
        let data = {};
        //         $(".price-filter").each(function(){
        //             if($(this).is(":checked")){
        //                 //console.log($(this).val())
        //                 price_filter = $(this).val();
        //             }
        //         })
        //         if(price_filter){
        //             console.log(price_filter.split("-"));
        //             let price_start = parseInt(price_filter.split("-")[0]);
        //             let price_end = parseInt(price_filter.split("-")[1]);
        //             data["price_start"] = price_start;
        //             data["price_end"] = price_end;
        //             console.log(price_start,price_end);
        //         }
        //         let context = "";
        //         let context1 = "";
        //         for(let i=0; i<10; i++){
        //             context += `<div class="row product-layout-list">
        //             <div class="col-lg-3 col-md-5 ">
        //                 <div class="product-image">
        //                     <a href="single-product.html">
        //                         <img src="images/product/large-size/products/9.jpg" alt="Li's Product Image">
        //                     </a>

        //                 </div>
        //             </div>
        //             <div class="col-lg-5 col-md-7">
        //                 <div class="product_desc">
        //                     <div class="product_desc_info">
        //                         <div class="product-review">
        //                             <h5 class="manufacturer">
        //                                 <a href="product-details.html">Ảnh sản phẩm</a>
        //                             </h5>
        //                             <div class="rating-box">
        //                                 <ul class="rating">
        //                                     <li><i class="fa fa-star-o"></i></li>
        //                                     <li><i class="fa fa-star-o"></i></li>
        //                                     <li><i class="fa fa-star-o"></i></li>
        //                                     <li class="no-star"><i class="fa fa-star-o"></i></li>
        //                                     <li class="no-star"><i class="fa fa-star-o"></i></li>
        //                                 </ul>
        //                             </div>
        //                         </div>
        //                         <h4><a class="product_name" href="single-product.html">product fake</a></h4>
        //                         <div class="price-box">
        //                             <span class="new-price">3.499.000đ</span>
        //                         </div>
        //                         <p>Máy Vặn Vít Dùng Pin TD001GM201 được sản xuất trên dây chuyền lắp ráp thiết bị cao cấp hiện đại, thiết kế đẹp. Tay cầm chắc chắn vừa vặn, có bọc đệm cao su mềm tiện lơi, chống trơn trượt, giúp vận hành thoải mái, kiểm soát máy dễ dàng hơn, và giảm mỏi tay trong quá trình sử dụng. Máy được sản xuất từ chất liệu thép không gỉ, thân máy được thiết kế từ nhựa tổng hợp, chịu được lực va đập lớn. Máy Vặn Vít Dùng Pin TD001GM201 dùng pin Li-ion 40V/4.0Ah có dung lượng lớn nên hiệu suất làm việc cao cùng thời gian sử dụng lâu bền.</p>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div class="col-lg-4">
        //                 <div class="shop-add-action mb-xs-30">
        //                     <ul class="add-actions-link">
        //                         <li class="add-cart"><a  >Thêm vào giỏ</a></li>
        //                         <li class="wishlist"><a href="wishlist.html"><i class="fa fa-heart-o"></i>Thêm vào ds yêu thích</a></li>
        //                         <li><a class="quick-view" data-toggle="modal" data-target="#exampleModalCenter"  ><i class="fa fa-eye"></i>Xem ảnh</a></li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>`
        //             context1 += `<div class="col-lg-4 col-md-4 col-sm-6 mt-40">
        //             <!-- single-product-wrap start -->
        //             <div class="single-product-wrap">
        //     <div class="product-image">
        //         <a href="single-product.html">
        //             <img src="images/product/large-size/products/8.jpg" alt="Li's Product Image">
        //         </a>

        //     </div>
        //     <div class="product_desc">
        //         <div class="product_desc_info">
        //             <div class="product-review">
        //                 <h5 class="manufacturer">
        //                     <a  >Ảnh sản phẩm</a>
        //                 </h5>
        //                 <div class="rating-box">
        //                     <ul class="rating">
        //                         <li><i class="fa fa-star-o"></i></li>
        //                         <li><i class="fa fa-star-o"></i></li>
        //                         <li><i class="fa fa-star-o"></i></li>
        //                         <li class="no-star"><i class="fa fa-star-o"></i></li>
        //                         <li class="no-star"><i class="fa fa-star-o"></i></li>
        //                     </ul>
        //                 </div>
        //             </div>
        //             <h4><a class="product_name" href="single-product.html">product fake</a></h4>
        //             <div class="price-box">
        //                 <span class="new-price">2.499.000đ</span>
        //             </div>
        //         </div>
        //         <div class="add-actions">
        //             <ul class="add-actions-link">
        //                 <li class="add-cart active"><a  >Thêm vào giỏ</a></li>
        //                 <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
        //                 <li><a   title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
        //             </ul>
        //         </div>
        //     </div>
        // </div>
        //             <!-- single-product-wrap end -->
        //         </div>`
        //         }
        //         $("#product-list").html(context1)
        //         $("#container-product-list").html(context1)
        //         console.log(context)
        $.ajax({
            type: "get",
            url: "ok",
            //headers:{"Authorization": localStorage.getItem("token")},
            data: data,

            success: function (response) {
                let productList = [];
                let context = "";
                //     productList.forEach((item)=>{
                //         context += `<div class="row product-layout-list">
                //         <div class="col-lg-3 col-md-5 ">
                //             <div class="product-image">
                //                 <a href="single-product.html">
                //                     <img src=${item.url} alt="Li's Product Image">
                //                 </a>

                //             </div>
                //         </div>
                //         <div class="col-lg-5 col-md-7">
                //             <div class="product_desc">
                //                 <div class="product_desc_info">
                //                     <div class="product-review">
                //                         <h5 class="manufacturer">
                //                             <a href="product-details.html">Ảnh sản phẩm</a>
                //                         </h5>
                //                         <div class="rating-box">
                //                             <ul class="rating">
                //                                 <li><i class="fa fa-star-o"></i></li>
                //                                 <li><i class="fa fa-star-o"></i></li>
                //                                 <li><i class="fa fa-star-o"></i></li>
                //                                 <li class="no-star"><i class="fa fa-star-o"></i></li>
                //                                 <li class="no-star"><i class="fa fa-star-o"></i></li>
                //                             </ul>
                //                         </div>
                //                     </div>
                //                     <h4><a class="product_name" href="single-product.html">${item.name}</a></h4>
                //                     <div class="price-box">
                //                         <span class="new-price">${item.price}</span>
                //                     </div>
                //                     <p>Máy Vặn Vít Dùng Pin TD001GM201 được sản xuất trên dây chuyền lắp ráp thiết bị cao cấp hiện đại, thiết kế đẹp. Tay cầm chắc chắn vừa vặn, có bọc đệm cao su mềm tiện lơi, chống trơn trượt, giúp vận hành thoải mái, kiểm soát máy dễ dàng hơn, và giảm mỏi tay trong quá trình sử dụng. Máy được sản xuất từ chất liệu thép không gỉ, thân máy được thiết kế từ nhựa tổng hợp, chịu được lực va đập lớn. Máy Vặn Vít Dùng Pin TD001GM201 dùng pin Li-ion 40V/4.0Ah có dung lượng lớn nên hiệu suất làm việc cao cùng thời gian sử dụng lâu bền.</p>
                //                 </div>
                //             </div>
                //         </div>
                //         <div class="col-lg-4">
                //             <div class="shop-add-action mb-xs-30">
                //                 <ul class="add-actions-link">
                //                     <li class="add-cart"><a  >Thêm vào giỏ</a></li>
                //                     <li class="wishlist"><a href="wishlist.html"><i class="fa fa-heart-o"></i>Thêm vào ds yêu thích</a></li>
                //                     <li><a class="quick-view" data-toggle="modal" data-target="#exampleModalCenter"  ><i class="fa fa-eye"></i>Xem ảnh</a></li>
                //                 </ul>
                //             </div>
                //         </div>
                //     </div>`              
                // });

            },
            error: function (err) {
                console.log(err)
            }
        })

    })

    function getListProduct() {
        $.ajax({
            type: "get",
            url: "http://localhost:8888/api/product/listpage",

            success: function (results) {
                console.log(results)
                let productList = [];
                let context = "";
                productList = results;
                console.log(productList)
                productList.forEach((item) => {
                    context += `<div class="col-lg-4 col-md-4 col-sm-6 mt-40">
                    <!-- single-product-wrap start -->
                    <div class="single-product-wrap">
            <div class="product-image">
                <a href="single-product.html" onClick ='setId(${item.pro_id});'>
                    <img style="height:200px" src=${item.image_url} alt="Li's Product Image">
                </a>
            </div>
            <div class="product_desc">
                <div class="product_desc_info">
                    <div class="product-review">
                        <h5 class="manufacturer">
                            <a  >Ảnh sản phẩm</a>
                        </h5>
                    </div>
                    <h4><a class="product_name" href="single-product.html">${item.pro_name}</a></h4>
                    <div class="price-box">
                        <span class="new-price">${item.price}đ</span>
                    </div>
                </div>
                <div class="add-actions">
                    <ul class="add-actions-link">
                        <li class="add-cart active"><a onClick='addToCart(${item.pro_id});'>Thêm vào giỏ</a></li>
                        <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
                        <li><a   title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                    </ul>
                </div>

            </div>
        </div>
                    <!-- single-product-wrap end -->
                </div>`
                });

                console.log(context)
                $("#product-list").html(context);
            },
            error: function (err) {
                console.log(err)
            }
        })
    }

    function addToCart(){
        let data = {
            "quantity" : 1,
            "product" : 
            {
                "pro_id": localStorage.getItem("pro_id_detail")
            },
            "account":{
                "id": localStorage.getItem("id")
            }
        }

        $.ajax({
            type: "post",
            url: "http://localhost:8888/api/cart/add",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data),
            
            
            success:  function(response){
                console.log(response);
                alert("Đã thêm vào giỏ hàng")
                //window.location.href= ".html"       
            },
            error: function(err){
                console.log(err);
            }
        })


    }
    // function clearItem(){
    //     localStorage.removeItem("pro_id_detail");
    // }

    // clearItem();

    getListProduct();

    //addToCart();
}
)

// <div style="margin-top:25px;" id="box-search">
//         <input type="text" onkeyup="ajaxSearch();" value="" placeholder="Nhập từ khóa tìm kiếm..." id="key" class="input-control">
//         <button style="margin-top:5px;" type="submit"> <i class="fa fa-search" onclick="return search();"></i> </button>
//         <!-- list box search -->
//         <div id="box-search-list">
//           <ul>
//             <li><img src="http://localhost:8080/devpro/php63/php63_project/assets/upload/products/1670158805_132195018346013007_2.jpg"> <a href="#">17 - 16 - MacBook Pro 16 Touch Bar 2.6GHz Core i7-</a></li>
//             <li><img src="http://localhost:8080/devpro/php63/php63_project/assets/upload/products/1670158805_132195018346013007_2.jpg"> <a href="#">17 - 16 - MacBook Pro 16 Touch Bar 2.6GHz Core i7-</a></li>
//             <li><img src="http://localhost:8080/devpro/php63/php63_project/assets/upload/products/1670158805_132195018346013007_2.jpg"> <a href="#">17 - 16 - MacBook Pro 16 Touch Bar 2.6GHz Core i7-</a></li>
//           </ul>
//         </div>
//         <!-- /list box search -->
//       </div>
//       <style type="text/css">
//           #box-search{position: relative;}
//           #box-search-list{position: absolute; z-index: 1; width: 100%; background: white; display: none; height: 300px; overflow: scroll;}
//           #box-search-list ul{padding:0px; margin:0px; list-style: none;}
//           #box-search-list ul li{border-bottom: 1px solid #dddddd;}
//           #box-search-list img{width: 50px;}
//         </style>
//       <!--</form>-->
//       <script type="text/javascript">
//         function search(){
//           var key = document.getElementById("key").value;
//           //di chuyen den trang tim kiem
//           location.href="index.php?controller=search&action=searchName&key="+key;
//         }
//         function ajaxSearch(){
//           //phai load thu vien jquery vao trang nay
//           //kiem tra thu vien jquery co load o trang hay khong
//           //$(document).ready(function(){ alert('da load jquery'); });
//           $("#box-search-list ul").empty();
//           //lay textbox co id=key
//           var key = $("#key").val();
//           if(key != ""){
//             //dat css de hien thi box search
//             $("#box-search-list").attr("style","display:block;");
//             //ajax goi den url de lay ket qua tra ve
//             //---
//             $.ajax({
//               url: "index.php?controller=search&action=ajaxSearch&key="+key,
//               success: function( result ) {
//                 //do du lieu vao box-search-list
//                 $("#box-search-list ul").append(result);
//               }
//             });
//             //---
//           }
//         }
//       </script>
//     </div>