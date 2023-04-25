$(document).ready(function(){
    //alert("hello")
    $("#form-login").submit(function(e){
        e.preventDefault();
        let data= {
            "email" : $("#email-login-input").val(),
            "password" : $("#password-login-input").val()
        }

        console.log(data);
        window.location.href= "http://127.0.0.1:5500/index.html"
        // $.ajax({
        //     type: "post",
        //     url: "ok",
        //     data: data,
            
        //     success:  function(){
        //         window.location.href= "index.html"
        //     },
        //     error: function(err){
        //         console.log(err)
        //     }
        // })
    })
}
)
