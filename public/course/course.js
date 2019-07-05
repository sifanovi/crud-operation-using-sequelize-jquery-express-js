$(window).on('load', function () {


    function populatetable(data) {
        var body = "";
        $.each(data, function (row, tablerow) {


            body = body + "<tr><td>" + tablerow.courseName + "</td><td>" + tablerow.courseNumber + "</td></tr>"


        })
        $("#course-table").find("tbody").empty().append(body);
        $("#course-table").DataTable();
        $('#course-table tbody').on('click', 'tr', function () {
            $(this).toggleClass('selected');
        });

    }

function populatecourseTable()
{
      $.ajax({
        url: "/api/course/",
        method: "GET"


    }).done(function (data) {
        populatetable(data);
    }).fail(function (data) {
        console.error(data);
    })
}
populatecourseTable();


    function createCourse(payload) {
        console.log(payload)
        $.ajax({
            url: "/api/course/",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(payload),


        }).done(function (data) {

           alert("Course Created Succesfully");
            populatecourseTable();

        })

    }

    $("#submit-course").click(function () {
        payload = {};
        payload['courseName'] = $("#courseName").val();
        payload['courseNumber'] = $("#courseNumber").val();
        createCourse(payload)

    })

})