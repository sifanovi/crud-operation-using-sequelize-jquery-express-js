$(window).on('load', function () {

    var teachers = "";
    $.ajax({
        url: "/api/faculty/",
        method: "GET"


    }).done(function (data) {
        console.log(data);
        $.each(data.data, function (row, column) {
            teachers = teachers + "<div class='well'>  <h1><span class='glyphicon glyphicon-phone-alt' aria-hidden='true'></span> "+column.teacherName+"</h1> <p>"+column.jobDescription+"</p><p>Phone:"+column.phoneNumber+"</p></div>"

        })
        $("#teacher").append(teachers);


    }).fail(function (data) {
        console.error(data);
    })

})