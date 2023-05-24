$(document).ready(function () {

    $("#btn-filter-a").click(function () {
        let price_filter = "";
        let data = {};
        $(".price-filter").each(function () {
            if ($(this).is(":checked")) {
                //console.log($(this).val())
                price_filter = $(this).val();
            }
        })
        if (price_filter) {
            console.log(price_filter.split("-"));
            let price_start = parseInt(price_filter.split("-")[0]);
            let price_end = parseInt(price_filter.split("-")[1]);
            data["firstPrice"] = price_start;
            data["lastPrice"] = price_end;
            console.log(price_start, price_end);
        }
        console.log(data)
        $.ajax({
            type: "get",
            url: "http://localhost:8888/api/product/listfilter?firstPrice="+data["firstPrice"]+"&lastPrice="+data["lastPrice"],

            success: function (results) {
               
                console.log(results)
                let productList = [];
                productList = results;
                console.log(productList);
                let context = "";
                productList.forEach((item) => {

                    let price = new Intl.NumberFormat('en-DE');
                    price = price.format(item.price);

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
                        <span class="new-price">${price}đ</span>
                    </div>
                </div>
                <div class="add-actions">
                    <ul class="add-actions-link">
                        <li class="add-cart active"><a onClick='addToCart(${item.pro_id});'>Thêm vào giỏ</a></li>
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

                    let price = new Intl.NumberFormat('en-DE');
                    price = price.format(item.price);

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
                        <span class="new-price">${price}đ</span>
                    </div>
                </div>
                <div class="add-actions">
                    <ul class="add-actions-link">
                        <li class="add-cart active"><a onClick='addToCart(${item.pro_id});'>Thêm vào giỏ</a></li>
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

    };

    function getListCategory(){
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
                    context += `<li class="has-sub"><a onClick ='getByCategory(${item.cg_id})' >${item.cg_name}</a>
                                           
                    </li>`
                });
                $("#list-cate").html(context);
            },
            error: function (err) {
                console.log(err)
            }
        })
    }

    getListCategory()
    getListProduct();
}
)