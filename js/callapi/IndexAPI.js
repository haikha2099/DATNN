$(document).ready(function(){
    function listnewproduct(){
        $.ajax({
            type: "get",
            url: "http://localhost:8888/api/product/list",
            //headers:{"Authorization": localStorage.getItem("token")},
            
            success: function(results){
                console.log(results)
                let productList = [];
                let context = "";
                productList = results;
                console.log(productList)
                productList.forEach((item)=>{
                    console.log("item" + item.image_url)
                    context += `<div class="swiper-slide" >
                    <div class="single-product-wrap">
                        <div class="product-image">
                            <a href="single-product.html">
                                <img style="height:200px"  src=${item.image_url}
                                    alt="Li's Product Image">
                            </a>
                            <span class="sticker">New</span>
                        </div>
                        <div class="product_desc">
                            <div class="product_desc_info">
                                <div class="product-review">
                                    <h5 class="manufacturer">
                                        <a href="#" data-toggle="modal" data-target="#mymodal3">Ảnh sản
                                            phẩm</a>
                                    </h5>
                                    <div class="rating-box">
                                        <ul class="rating">
                                            <li><i class="fa fa-star-o"></i></li>
                                            <li><i class="fa fa-star-o"></i></li>
                                            <li><i class="fa fa-star-o"></i></li>
                                            <li class="no-star"><i class="fa fa-star-o"></i></li>
                                            <li class="no-star"><i class="fa fa-star-o"></i></li>
                                        </ul>
                                    </div>
                                </div>
                                <!--  -->

                                <!--  -->
                                <h4><a class="product_name" href="single-product.html">${item.pro_name}</a>
                                </h4>
                                <div class="price-box">
                                    <span class="new-price">${item.price}</span>
                                </div>
                            </div>
                            <div class="add-actions" style="opacity:1; position: relative; bottom:0;">
                                <ul class="add-actions-link" style="margin:0;">
                                    <li class="add-cart active"><a href="#">Thêm vào giỏ</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- single-product-wrap end -->
                </div>`
                });
                $("#list_new_pro").html(context);
            },
            error: function(err){
                console.log(err)
            }
            
        });
    }
    // function clearItem(){
    //     localStorage.removeItem("pro_id_detail");
    // }

    // clearItem();

    
    listnewproduct();
    //listfeaturedproduct()

});
