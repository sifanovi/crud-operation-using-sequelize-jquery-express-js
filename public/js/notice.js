$(window).on('load', function () {

    var notices = "";
    $.ajax({
        url: "/api/notice/",
        method: "GET"


    }).done(function (data) {
        console.log(data);
        $.each(data.data, function (row, column) {
           notices = notices + "<div class='well'>  <h1 class='text-primary'><span class='glyphicon glyphicon-calendar' aria-hidden='true'></span> "+column.createdAt.substring(0,10)+"</h1><p>"+column.content+"</p></div>"

        })
        $("#notice").append(notices);


    }).fail(function (data) {
        console.error(data);
    })

})