$(document).ready(function(){
    function getAccountById(){
        $.ajax({
            type: "get",
            url: "http://localhost:8888/api/accounts/"+ localStorage.getItem("username"),

            success: function(results){
                console.log(results)
                let context = "";
                //categoryList = results;
                //console.log(categoryList)
                context  +=`<div class="col-12 mb-20">
                <label>Họ tên</label>
                <input id="fullname-input" class="mb-0" type="text" value= "${results.fullname}">
            </div>
            <div class="col-md-12 mb-20">
                <label>Email</label>
                <input id="email-input" class="mb-0" type="text" value= " ${results.email}">
            </div>
            <div class="col-md-12 mb-20">
                <label>Số điện thoại</label>
                <input id="phone-input" class="mb-0" type="text" value= "${results.phone}">
            </div>
            <div class="col-md-12 mb-20">
                <label>Địa chỉ</label>
                <input id="address-input" class="mb-0" type="text" value= "${results.address}">
            </div>
            <div class="col-12">
                <button type="submit" class="register-button mt-0">Lưu</button>
            </div>
            `
                $("#ac_detail").html(context);
            },
            error: function(err){
                 console.log(err)
            }
        })
    };

    $("#form-update").submit(function(e){
        e.preventDefault();

        var today = new Date();
        
        let now = today.toLocaleString();
        
        let data = {
            "fullname" : $("#fullname-input").val(),
            "phone" : $("#phone-input").val(),
            "email" : $("#email-input").val(),
            "address" : $("#address-input").val(),
            "date-update": now
        }

        console.log(data);

        $.ajax({
            type: "put",
            url: "http://localhost:8888/api/accounts/update/"+localStorage.getItem("id"),
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data),
            
            
            success:  function(response){
                console.log(response);
                alert("cập nhật thông tin thành công!")
                window.location.href= "account-detail.html"       
            },
            error: function(err){
                console.log(err);
                alert("cập nhật không thành công vui lòng xem lịa kết nối!");
            }
        })
    })

    // function clearItem(){
    //     localStorage.removeItem("pro_id_detail");
    // }

    // clearItem();

    getAccountById();
})