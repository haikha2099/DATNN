$(document).ready(function(){
    function loadlist(){
        let context1 = "";
        for(let i=0; i< 4;i++){
            context1 += `<div class="col-lg-12">
            <div class="single-product-wrap">
                <div class="product-image">
                    <a href="single-product.html">
                        <img src="images/product/large-size/products/1.jpg"
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
                        <h4><a class="product_name" href="single-product.html">product fake</a>
                        </h4>
                        <div class="price-box">
                            <span class="new-price">3.499.000đ</span>
                        </div>
                    </div>
                    <div class="add-actions">
                        <ul class="add-actions-link">
                            <li class="add-cart active"><a href="#">Thêm vào giỏ</a></li>
                            <li><a class="links-details" href="wishlist.html"><i
                                        class="fa fa-heart-o"></i></a></li>
                            <li><a href="#" title="quick view" class="quick-view-btn"
                                    data-toggle="modal" data-target="#exampleModalCenter"><i
                                        class="fa fa-eye"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- single-product-wrap end -->
        </div>`
        }
        $(".product-active").html(context1)
        console.log(context1)
    }

    loadlist();
    
    // $ajax({
    //     type: "get",
    //     url: "",
    //     headers:{"Authorization": localStorage.getItem("token")},
    
    //     success: function(response){
    //         let productList = [];
    //         let context = "";

    //         productList.forEach((item)=>{
    //             context += `<div class="col-lg-12">
    //             <div class="single-product-wrap">
    //                 <div class="product-image">
    //                     <a href="single-product.html">
    //                         <img src="images/product/large-size/products/1.jpg"
    //                             alt="Li's Product Image">
    //                     </a>
    //                     <span class="sticker">New</span>
    //                 </div>
    //                 <div class="product_desc">
    //                     <div class="product_desc_info">
    //                         <div class="product-review">
    //                             <h5 class="manufacturer">
    //                                 <a href="#" data-toggle="modal" data-target="#mymodal3">Ảnh sản
    //                                     phẩm</a>
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
    //                         <!--  -->

    //                         <!--  -->
    //                         <h4><a class="product_name" href="single-product.html">product fake</a>
    //                         </h4>
    //                         <div class="price-box">
    //                             <span class="new-price">3.499.000đ</span>
    //                         </div>
    //                     </div>
    //                     <div class="add-actions">
    //                         <ul class="add-actions-link">
    //                             <li class="add-cart active"><a href="#">Thêm vào giỏ</a></li>
    //                             <li><a class="links-details" href="wishlist.html"><i
    //                                         class="fa fa-heart-o"></i></a></li>
    //                             <li><a href="#" title="quick view" class="quick-view-btn"
    //                                     data-toggle="modal" data-target="#exampleModalCenter"><i
    //                                         class="fa fa-eye"></i></a></li>
    //                         </ul>
    //                     </div>
    //                 </div>
    //             </div>
    //             <!-- single-product-wrap end -->
    //         </div>`
    //         })
    //     }
    // })
})
