

$(window).on('load', function () {



function resister(payload)
{

     $.ajax({
        url: "/api/register/",
        method: "POST",
         headers: {
                "content-type": "application/json"
        },
            data: JSON.stringify(payload),



    }).done(function (data) {
        alert("User Created Succesfuly");
       window.location.href="/client/login";


    }).fail(function (data) {
       alert("User Already exists or something wrong")
    })

}
    $("#register").click(function () {
        payload = {};
        payload['username'] = $("#username").val();
        payload['email'] = $("#email").val();
        payload['password'] = $("#password").val();
      

        resister(payload);

    })

    $("#login").click(function()
    {
        $.ajax({
            url:"/client/login",
            method:"post",
             headers: {
                "content-type": "application/json"
        },
            data:JSON.stringify({"username":$("#username").val(),"password":$("#password").val(),"done":null})
        }).done(function(data)
        {
            console.log(data);
            res.redirect("/client/student");
        })
    })

})