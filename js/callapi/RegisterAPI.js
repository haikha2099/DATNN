$(document).ready(function(){
    //alert("hello")
    $("#form-login").submit(function(e){
        e.preventDefault();
        let data= {
            "username" : $("#username-login-input").val(),
            "password" : $("#password-login-input").val()
        }
        console.log(data);
        //window.location.href= "http://127.0.0.1:5500/index.html"
        $.ajax({
            type: "post",
            url: "http://localhost:8888/api/auth/signin",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data),
            
            
            success:  function(response){
                
                localStorage.setItem("role", response.role);
                localStorage.setItem("username", response.username);
                localStorage.setItem("token", response.token);
                localStorage.setItem("id", response.id);

                console.log(localStorage.getItem('username'))
                window.location.href= "index.html"       
            },
            error: function(err){
                console.log(err);
                alert("tài khoản hoặc mật khẩu không đúng. Vui lòng kiểm tra lại!");
                window.location.href= "login-register.html"
            }
        })
    })

    $("#form-signup").submit(function(e){
        e.preventDefault();
        let data= {};
        if($("#password-input").val() == $("#confirmpassword-input").val()){
            data= {
                "username" : $("#username-input").val(),
                "password" : $("#password-input").val(),
                "fullname" : $("#fullname-input").val(),
                "email" : $("#email-input").val(),
                "phone" : $("#phone-input").val(),
                "address" : $("#address-input").val()
            }
        }
        else{
            alert("mật khẩu chưa chính xác! Vui lòng kiểm tra lại");
        }
        
        console.log(data);
        //window.location.href= "http://127.0.0.1:5500/index.html"
        $.ajax({
            type: "post",
            url: "http://localhost:8888/api/auth/signup",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data),
            
            
            success:  function(response){
                console.log(response);
                alert("Đăng kí thành công! Bạn có thể đăng nhập lại!")
                window.location.href= "login-register.html"       
            },
            error: function(err){
                console.log(err);
            }
        })
    })

    function check_logout(){
        localStorage.removeItem('username')
        localStorage.removeItem('role')
        localStorage.removeItem('id')
        localStorage.removeItem('token')

        console.log('user logout')
    }

    check_logout();

    // function clearItem(){
    //     localStorage.removeItem("pro_id_detail");
    // }

    clearItem();
}
)
