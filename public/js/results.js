$(window).on('load', function () {

    function populatetable(data) {
        var body = "";
        $.each(data, function (row, tablerow) {


            body = body + "<tr id=" + tablerow.id + "><td>" + tablerow.course.courseName + "</td><td>" + tablerow.course.credit + "</td><td>" + tablerow.attendance + "</td><td>" + tablerow.quizMarks + "</td><td>" + tablerow.finalMarks + "</td><td>" + tablerow.total + "</td><td>" + tablerow.grade + "</td></tr>"


        })
        $("#marks-table").find("tbody").empty().append(body);
        $("#marks-table").DataTable();


    }

    function populateCourse() {
        $.ajax({
            url: "/api/batch/",
            method: "GET"


        }).done(function (response) {
            console.log(response);
            var courseChoices = "";
            $.each(response['data'], function (id, column) {
                courseChoices = courseChoices + "<option value='" + column.id + "'>" + column.batchName + "</option>";

            })
            console.log(courseChoices);
            $("#batch").append(courseChoices);


        }).fail(function (data) {
            console.error(data);
        })
    }

    function getResult(batchId, studentId) {
        var totalGrade = 0;
        var courseCredit = 0;
        var totalmarks = 0;
        var cgpa;

        $.ajax({
            url: "/api/marks/" + batchId + "/" + studentId,
            method: "GET"


        }).done(function (response) {
            if (response.data.length > 0) {

                  if ($.fn.DataTable.isDataTable("#marks-table")) {
                $('#marks-table').DataTable().clear().destroy();
            }
                populatetable(response.data);

                console.log(response.data);
                $.each(response.data, function (row, column) {
                    totalGrade = totalGrade + parseFloat(column.grade) * parseFloat(column.course.credit);
                    courseCredit = courseCredit + parseFloat(column.course.credit);
                    totalmarks = totalmarks + parseFloat(column.total);
                })
                cgpa = parseFloat(totalGrade / courseCredit);

                $("#showcredit").text(courseCredit);
                $("#cgpa").text(cgpa);
                $("#showtotal").text(totalmarks);


            }
            else {
                alert("Result not found")
            }


        }).fail(function (data) {
            console.error(data);
            alert("Result Not Found");
        })
    }

    $("#getResult").click(function () {
        getResult($("#batch").val(), $("#student").val());
    })

    populateCourse();
})

