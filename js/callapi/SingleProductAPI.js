$(document).ready(function(){

    function productDetail(){
        $.ajax({
            type: "get",
            url: "http://localhost:8888/api/product/"+localStorage.getItem("pro_id_detail"),

            success: function (results) {
                console.log(results)
                let productDetail = results;

                let price = new Intl.NumberFormat('en-DE');
                price = price.format(productDetail.price);

                let context = "";
                console.log(productDetail)
                context=`
                <div class="col-lg-5 col-md-6">
                <!-- Product Details Left -->
                 <div class="product-details-left">
                     <div class="product-details-images slider-navigation-1">
                         <div class="lg-image">
                             <a class="popup-img venobox vbox-item" href=${productDetail.image_url} data-gall="myGallery">
                                 <img src=${productDetail.image_url} alt="product image">
                             </a>
                         </div>
                     </div>
                 </div>
                 <!--// Product Details Left -->
             </div>
             <div class="col-lg-7 col-md-6">
                 <div class="product-details-view-content pt-60">
                     <div class="product-info">
                         <h2>${productDetail.pro_name}</h2>
                         <div class="price-box pt-20">
                             <span class="new-price new-price-2">${price}đ</span>
                         </div>
                         <div class="product-desc">
                             <p>
                                 <span>${productDetail.pro_describe}
                                 </span>
                             </p>
                         </div>
                         <div class="product-desc">
                             <p>
                                 <span>Size: ${productDetail.size}
                                 </span>
                             </p>
                         </div>
                        <div class="single-add-to-cart">
                             <form id="add_cart_2" class="cart-quantity">
                                 <div class="quantity">
                                     <label>Số lượng</label>
                                     <div class="cart-plus-minus">
                                     
                                     <input style="max-width : 100%" type="number" min= "1" value="1" id="qty" class="cart-plus-minus-box">
                                 
                                     </div>
                                 </div>
                                 <button class="add-to-cart"><a onClick = 'addToCart(${productDetail.pro_id})'>Thêm vào giỏ hàng</a></button>
                             </form>
                         </div>
                         <div class="product-additional-info pt-25">
                             <div class="product-social-sharing pt-25">
                                 <ul>
                                     <li class="facebook"><a href="#"><i class="fa fa-facebook"></i>Facebook</a></li>
                                     <li class="twitter"><a href="#"><i class="fa fa-twitter"></i>Twitter</a></li>
                                     <li class="google-plus"><a href="#"><i class="fa fa-google-plus"></i>Google +</a></li>
                                     <li class="instagram"><a href="#"><i class="fa fa-instagram"></i>Instagram</a></li>
                                 </ul>
                             </div>
                         </div>
                         <div class="block-reassurance">
                             <ul>
                                 <li>
                                     <div class="reassurance-item">
                                         <div class="reassurance-icon">
                                             <i class="fa fa-check-square-o"></i>
                                         </div>
                                         <p>Chính sách bảo hành</p>
                                     </div>
                                 </li>
                                 <li>
                                     <div class="reassurance-item">
                                         <div class="reassurance-icon">
                                             <i class="fa fa-truck"></i>
                                         </div>
                                         <p>Chính sách giao hàng</p>
                                     </div>
                                 </li>
                                 <li>
                                     <div class="reassurance-item">
                                         <div class="reassurance-icon">
                                             <i class="fa fa-exchange"></i>
                                         </div>
                                         <p> Chính sách hoàn trả hàng</p>
                                     </div>
                                 </li>
                             </ul>
                         </div>
                     </div>
                 </div>
             </div> 
                `;

                let context1=`
                <div class="product-description">
                <span>${productDetail.pro_detail}</span>
            </div>
                `;

                $("#pro_detail_content_1").html(context);
                $("#description").html(context1);
                localStorage.removeItem("pro_id_detail");
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
    
    productDetail();
});