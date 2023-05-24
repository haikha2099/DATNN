$(document).ready(function(){

    function getListCart(){
        if(localStorage.getItem("token")!=null){
            $.ajax({
                type: "get",
                url: "http://localhost:8888/api/cart/list",

                success: function(response){
                    
                    let listCart = [];
                    listCart = response;
                    console.log(listCart);

                    let context = "";
                    listCart.forEach((item)=>{
                        if(localStorage.getItem("id") == item.account.id){
                            let price = new Intl.NumberFormat('en-DE');
                            price = price.format(item.product.price);

                            let totalPrice = new Intl.NumberFormat('en-DE');
                            totalPrice = totalPrice.format(item.quantity*item.product.price);

                            let proName = item.product.pro_name;

                            context += `<tr>
                            <td class="li-product-remove"><a onClick = 'removeItem(${item.id});'><i class="fa fa-times"></i></a></td>
                            <td class="li-product-thumbnail"><a href="#"><img src=${item.product.image_url} style="width: 100px; height:80px;" alt=""></a></td>
                            <td class="li-product-name"><a>${item.product.pro_name}</a></td>
                            <td class="li-product-price"><span class="amount">${price} vnđ</span></td>
                            <td class="quantity">
                                <input style="max-width : 20%" type="number" id="qty" class="cart-plus-minus-box" value="${item.quantity}" required="Không thể để trống">
                            </td>
                            <td class="product-subtotal"><span class="amount">${totalPrice} vnđ</span></td>
                            <td class="li-product-remove"><a onClick = 'addOrdersItem(${item.id},${item.product.price});'><i class="fa fa-check"></i></a></td>
                        </tr>`;
                        }
                        console.log(context);
                        $("#cart_list").html(context);
                    });
                },
                error: function (err) {
                    console.log(err)
                }
            })

        }
        else{
            alert("Bạn chưa đăng nhâp!");
            window.location.href= "login-register.html";
        }
    }


    getListCart();
});