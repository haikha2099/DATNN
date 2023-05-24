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
                    href="shop-left-sidebar.html" onClick ="getByCategory(${item.cg_id})">${item.cg_name}</a>
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
    getCategories();

    check_login();


})