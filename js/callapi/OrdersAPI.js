$(document).ready(function(){
    function getOrders(){
        $.ajax({
            type: "get",
            url: "http://localhost:8888/api/orders/list",

            success: function(results){
                console.log(results)
                let ordersList = [];
                let context = "";
                ordersList = results;
                console.log(ordersList)
                ordersList.forEach((item)=>{
                    if(item.account.id == localStorage.getItem("id")){
                        if(item.status == false){

                            context  +=`
                            <tr>
                                <td class="li-product-name"><a href="#">${item.name_product}</a></td>
                                <td class="li-product-price"><span class="amount">${item.price}</span></td>
                                <td class="li-product-stock-status"><span>${item.dateadd}</span></td>
                                <td class="li-product-add-cart"><a onClick='updateOrders(${item.id});'>Xác Nhận</a></td>
                            </tr>
                            `
                        }
                        else{
                            context  +=`
                            <tr>
                                <td class="li-product-name"><a href="#">${item.name_product}</a></td>
                                <td class="li-product-price"><span class="amount">${item.price}</span></td>
                                <td class="li-product-stock-status"><span>${item.dateadd}</span></td>
                                <td class="li-product-stock-status"><span class="in-stock">Đã xác nhận</span></td>
                            </tr>
                            `
                        }
                    }
                });
                console.log(context);
                $("#list-order").html(context);
            },
            error: function(err){
                 console.log(err)
            }
        })
    };
    // function clearItem(){
    //     localStorage.removeItem("pro_id_detail");
    // }

    clearItem();

    getOrders();
})