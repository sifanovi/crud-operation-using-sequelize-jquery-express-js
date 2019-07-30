$(window).on('load', function () {

    function showMarks() {
        $("#showattendance").text($("#attendance").val());
        $("#showquiz").text($("#quizMarks").val());
        $("#showfinal").text($("#finalMarks").val());
        $("#showtotal").text($("#total").val());

    }

    function resetForm() {
        $("#batchId").val("");
        $("#studentId").val("");
        $("#courseId").val("");
        $("#teacherId").val("");
        $("#attendance").val("");
        $("#quizMarks").val("");
        $("#finalMarks").val("");
        $("#grade").val("");
        $("#total").val("");
        $("#numberOfQuiz").val("");
      $("#quiz-template").empty();
    }


    $("#marks-form").validate({
        rules: {
            batchId: "required",
            studentId: "required",
            courseId: "required",
            teacherId: "required",
            quizMarks: "required",
            finalMarks: "required",
            attendance: "required",


        },

        errorElement: "em",
        errorPlacement: function (error, element) {
            // Add the `help-block` class to the error element
            error.addClass("help-block");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
        }
    });

    function createQuizTemplate(number) {
        $("#quiz-template").empty();
        quiztemplate = "";
        for (i = 1; i <= number; i++) {
            quiztemplate = quiztemplate + "<div class='form-group'>    <label for='quiz'>Quiz " + i + ":</label>  <input type='text' id='quiz" + i + "' class='quiz form-control' placeholder='Enter Quiz Number'></div>"

        }

        $("#quiz-template").append(quiztemplate);

    }


    function populatetable(data) {
        var body = "";
        $.each(data, function (row, tablerow) {


            body = body + "<tr id=" + tablerow.id + "><td>" + tablerow.id + "</td><td>" + tablerow.batchId + "</td><td>" + tablerow.studentId + "</td><td>" + tablerow.courseId + "</td><td>" + tablerow.teacherId + "</td><td>" + tablerow.attendance + "</td><td>" + tablerow.quizMarks + "</td><td>" + tablerow.finalMarks + "</td><td>" + tablerow.total + "</td></tr>"


        })
        $("#marks-table").find("tbody").empty().append(body);
        $("#marks-table").DataTable();


    }

    $('#marks-table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $("#marks-table tr.selected").removeClass('selected');
            $(this).addClass('selected');
        }
    });


    function populatesbatches() {
        $.ajax({
            url: "/api/batch/",
            method: "GET"


        }).done(function (response) {

            var choices = "";
            $.each(response['data'], function (id, column) {
                choices = choices + "<option value='" + column.id + "'>" + column.batchName + "</option>";

            })

            $("#batchId").append(choices);


        }).fail(function (data) {
            console.error(data);
        })
    }

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
            $("#courseId").append(courseChoices);


        }).fail(function (data) {
            console.error(data);
        })
    }

    function populateTeacher() {
        $.ajax({
            url: "/api/faculty/",
            method: "GET"


        }).done(function (response) {
            console.log(response);
            var facultyChoices = "";
            $.each(response['data'], function (id, column) {
                facultyChoices = facultyChoices + "<option value='" + column.id + "'>" + column.teacherName + "</option>";

            })
            console.log(facultyChoices);
            $("#teacherId").append(facultyChoices);


        }).fail(function (data) {
            console.error(data);
        })
    }

    populatesbatches();
    populateCourse();
    populateTeacher();

    function populatemarksTable() {
        $.ajax({
            url: "/api/marks/",
            method: "GET"


        }).done(function (data) {
            populatetable(data['data']);
        }).fail(function (data) {
            console.error(data);
        })
    }

    populatemarksTable();


    function createMarks(payload) {
        console.log(payload)
        $.ajax({
            url: "/api/marks/",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(payload),


        }).done(function (data) {
            resetForm();

            alert("Marks Submitted Succesfully");
            if ($.fn.DataTable.isDataTable("#marks-table")) {
                $('#marks-table').DataTable().clear().destroy();
            }
            populatemarksTable();

        })

    }

    function calculateTotalMarks() {
        total = parseInt($("#attendance").val()) + parseInt($("#quizMarks").val()) + parseInt($("#finalMarks").val());
        $("#total").val(total);
        return total;
    }

    function calculateGrade(marks) {
        if (marks >= 80 && marks <= 100) {
            return "4.00";
        }
        else if (marks >= 75 && marks <= 79) {
            return "3.75"
        }
        else if (marks >= 70 && marks <= 74) {
            return "3.50"
        }
        else if (marks >= 65 && marks <= 69) {
            return "3.25"
        }
        else if (marks >= 60 && marks <= 64) {
            return "3.00"
        }
        else if (marks >= 55 && marks <= 59) {
            return "2.75"
        }
        else if (marks >= 50 && marks <= 54) {
            return "2.50"
        }
        else if (marks >= 45 && marks <= 49) {
            return "2.25"
        }
        else if (marks >= 40 && marks <= 44) {
            return "2.00"
        }
        else {
            return "0.0"
        }

    }

    $("#quizMarks").change(function () {
        isGrade = calculateGrade(calculateTotalMarks());
        $("#grade").val(isGrade).trigger("change");
        showMarks();

    })
      $("#attendance").change(function () {

          showMarks();

    });
    $("#finalMarks").change(function () {
        isGrade = calculateGrade(calculateTotalMarks());
        $("#grade").val(isGrade).trigger("change");
        showMarks();

    })

    function updateMarks(id, payload) {
        $.ajax({
            url: "/api/marks/" + id,
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(payload),


        }).done(function (data) {

            resetForm();

            alert("Marks Updated Succesfully");
            if ($.fn.DataTable.isDataTable("#marks-table")) {
                $('#marks-table').DataTable().clear().destroy();
            }
            populatemarksTable();

        })

    }

    $("#update-marks").click(function () {
        var id = $("#marks-table tr.selected").attr("id");
        if ($("#marks-form").valid()) {
            payload = {};
            payload['batchId'] = $("#batchId").val();
            payload['studentId'] = $("#studentId").val();
            payload['teacherId'] = $("#teacherId").val();
            payload['courseId'] = $("#courseId").val();
            payload['attendance'] = $("#attendance").val();
            payload['quizMarks'] = $("#quizMarks").val();
            payload['finalMarks'] = $("#finalMarks").val();
            payload['grade'] = $("#grade").val();
            payload['total'] = $("#total").val();
            updateMarks(id, payload)
        }


    })

    $("#submit-marks").click(function () {

        if ($("#marks-form").valid()) {
            payload = {};
            payload['batchId'] = $("#batchId").val();
            payload['studentId'] = $("#studentId").val();
            payload['teacherId'] = $("#teacherId").val();
            payload['courseId'] = $("#courseId").val();
            payload['attendance'] = $("#attendance").val();
            payload['quizMarks'] = $("#quizMarks").val();
            payload['finalMarks'] = $("#finalMarks").val();
            payload['grade'] = $("#grade").val();
            payload['total'] = $("#total").val();
            createMarks(payload);
        }

    })

    function averageOfQuiz() {
        total = 0;
        for (i = 1; i <= $("#numberOfQuiz").val(); i++) {
            if (parseInt($("#quiz" + i).val()) > 0) {
                total = parseFloat(total + parseInt($("#quiz" + i).val()));
            }


        }
        average = parseFloat(total / $("#numberOfQuiz").val());
        console.log(average);
        $("#quizMarks").val(parseFloat(average));
    }

    function createEventOfQuiz(number) {
        console.log(number);
        $("#quiz" + number).change(function () {
            averageOfQuiz();

        })

    }

    $("#numberOfQuiz").keyup(function () {
        if (parseInt($(this).val()) > 0) {
            createQuizTemplate($(this).val())
            for (i = 1; i <= $(this).val(); i++) {
                createEventOfQuiz(i);

            }
        }
        else {
            $("#quiz-template").empty();
        }
    })

    function edititem(id) {
        $.ajax({
            url: "/api/marks/" + id,
            method: "GET",
            headers: {
                "content-type": "application/json"
            },

        }).done(function (data) {
            $("#batchId").val(data.data.batchId);
            $("#studentId").val(data.data.studentId);
            $("#courseId").val(data.data.courseId);
            $("#teacherId").val(data.data.teacherId);
            $("#attendance").val(data.data.attendance);
            $("#quizMarks").val(data.data.quizMarks);
            $("#finalMarks").val(data.data.finalMarks);
            $("#grade").val(data.data.grade);
            $("#total").val(data.data.total);
            $("#submit-marks").addClass("hide");
            $("#update-marks").removeClass("hide");


        })

    }

    $("#edit").click(function () {
        if ($("#marks-table tr.selected").attr("id")) {
            $("#editModal").show();
        }
    })
    $("#proceedEdit").click(function () {

        edititem($("#marks-table tr.selected").attr("id"));
        $("#editModal").hide();
    })

    $("#cancelEdit").click(function () {
        $("#editModal").hide();
    })


    function deleteitem(id) {
        $.ajax({
            url: "/api/marks/delete/" + id,
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },

        }).done(function (data) {

            alert("marks deleted Succesfully");
            if ($.fn.DataTable.isDataTable("#marks-table")) {
                $('#marks-table').DataTable().clear().destroy();
            }
            populatemarksTable();

        })

    }

    $("#delete").click(function () {
        if ($("#marks-table tr.selected").attr("id")) {
            $("#deleteModal").show();
        }
    })
    $("#proceedDelete").click(function () {
        deleteitem($("#marks-table tr.selected").attr("id"));
        $("#deleteModal").hide();
    })

    $("#cancelDelete").click(function () {
        $("#deleteModal").hide();
    })


})