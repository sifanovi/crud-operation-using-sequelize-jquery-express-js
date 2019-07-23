$(window).on('load', function () {
    function populateCourse() {
        $.ajax({
            url: "/api/course/",
            method: "GET"


        }).done(function (response) {
            console.log(response);
            var courseChoices = "";
            $.each(response['data'], function (id, column) {
                courseChoices = courseChoices + "<option value='" + column.id + "'>" + column.courseName + "</option>";

            })
            console.log(courseChoices);
            $("#course").append(courseChoices);


        }).fail(function (data) {
            console.error(data);
        })
    }

    function getResult(courseId, studentId) {
        $.ajax({
            url: "/api/marks/" + courseId + "/" + studentId,
            method: "GET"


        }).done(function (response) {
            if (response.data) {
                $("#quiz").empty();
                $("#final").empty();
                $("#grade").empty();
                $("#quiz").append(response.data.quizMarks);
                $("#final").append(response.data.finalMarks);
                $("#grade").append(response.data.grade);
            }
            else {
                alert("Result Not Found")
            }


        }).fail(function (data) {
            console.error(data);
            alert("Result Not Found");
        })
    }

    $("#getResult").click(function () {
        getResult($("#course").val(), $("#student").val());
    })

    populateCourse();
})

