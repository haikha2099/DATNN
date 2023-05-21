$(document).ready(function () {
    function getCategories() {
        $.ajax({
            type: "get",
            url: "http://localhost:8888/api/category/list",

            success: function (results) {
                console.log(results)
                let categoryList = [];
                let context = "";
                categoryList = results;
                console.log(categoryList)
                categoryList.forEach((item) => {
                    context += `<li class="sub-dropdown-holder"><a
                    href="shop-left-sidebar.html">${item.cg_name}</a>
            </li>`
                });
                $("#list_category").html(context);
            },
            error: function (err) {
                console.log(err)
            }
        })
    };

    function check_login() {
        if (localStorage.getItem('token') != null) {
            let context = `
            <li>
                <div><span>xin chào ${localStorage.getItem('username')}</span></div>
            </li>               
        `;
            console.log(context);
            $("#username_show").html(context);
            let context1 = `
            <ul class="ht-setting-list">
                <li><a href="account-detail.html">Thông Tin Tài Khoản</a></li>
                <li><a href="orders-detail.html">Xem Đơn Hàng</a></li>
                <li><a href="login-register.html">Đăng Xuất</a></li>
            </ul>
            
            `
            $("#show_setting").html(context1);
        }
    }

    // $("#search_form").submit(function (e) {
    //     e.preventDefault();

    //     let stringSearch1 = $("#stringSearch").val();
    //     console.log(stringSearch)
    //     $.ajax({
    //         type: "get",
    //         url: "http://localhost:8888/api/products/listsearch",
    //         data: { stringSearch: decodeURIComponent(stringSearch1)} ,
    //         contentType: 'application/json; charset=utf-8',

    //         success: function (response) {
    //             console.log(response);

    //             let listProduct = [];
    //             listProduct = response;

    //             window.location.href = "shop-left-sidebar.html"

    //             listProduct.foreach(item => {
    //                 context += `<div class="col-lg-4 col-md-4 col-sm-6 mt-40">
    //                 <!-- single-product-wrap start -->
    //                 <div class="single-product-wrap">
    //         <div class="product-image">
    //             <a href="single-product.html" onClick ='setId(${item.pro_id});'>
    //                 <img style="height:200px" src=${item.image_url} alt="Li's Product Image">
    //             </a>
    //         </div>
    //         <div class="product_desc">
    //             <div class="product_desc_info">
    //                 <div class="product-review">
    //                     <h5 class="manufacturer">
    //                         <a  >Ảnh sản phẩm</a>
    //                     </h5>
    //                 </div>
    //                 <h4><a class="product_name" href="single-product.html">${item.pro_name}</a></h4>
    //                 <div class="price-box">
    //                     <span class="new-price">${item.price}đ</span>
    //                 </div>
    //             </div>
    //             <div class="add-actions">
    //                 <ul class="add-actions-link">
    //                     <li class="add-cart active"><a onClick='addToCart(${item.pro_id});'>Thêm vào giỏ</a></li>
    //                     <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
    //                     <li><a   title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
    //                 </ul>
    //             </div>

    //         </div>
    //     </div>
    //                 <!-- single-product-wrap end -->
    //             </div>`
    //             });

    //             console.log(context)
    //             $("#product-list").html(context);
    //         },
    //         error: function (err) {
    //             console.log(err);
    //         }
    //     })
    // })

    getCategories();

    check_login();


})