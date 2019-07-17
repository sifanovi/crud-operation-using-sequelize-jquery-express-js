$(window).on('load', function () {


      $("#course-form").validate({
        rules: {
            courseName: {
                required: true,
                minlength: 3
            },
             courseNumber: {
                required: true,
                minlength: 3
            },
            
        },
        messages: {
            courseName: {
                required: 'Please enter your course name',
                minlength: 'Course name must have more than 3 characters'
            },
            courseNumber: {
                required: 'Please enter your course number',
                minlength: 'Course Number must have more than 3 characters'
            },
           
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

    function populatetable(data) {
        var body = "";
        $.each(data, function (row, tablerow) {


            body = body + "<tr id="+tablerow.id+"><td>" + tablerow.courseName + "</td><td>" + tablerow.courseNumber + "</td></tr>"


        })
        $("#course-table").find("tbody").empty().append(body);
        $("#course-table").DataTable();
       

    }

 $('#course-table tbody').on('click', 'tr', function () {
         if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            $("#course-table tr.selected").removeClass('selected');
            $(this).addClass('selected');
        }
        });    

function populatecourseTable()
{
      $.ajax({
        url: "/api/course/",
        method: "GET"


    }).done(function (data) {
        populatetable(data.data);
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
            if ($.fn.DataTable.isDataTable("#course-table")) {
                $('#course-table').DataTable().clear().destroy();
            }
            populatecourseTable();

        })

    }

    $("#submit-course").click(function () {
        if ($("#course-form").valid()) {
        payload = {};
        payload['courseName'] = $("#courseName").val();
        payload['courseNumber'] = $("#courseNumber").val();
        createCourse(payload)
}
    })

     function updateCourse(id,payload) {
        $.ajax({
            url: "/api/course/"+id,
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(payload),


        }).done(function (data) {

            alert("Course Updated Succesfully");
            if ($.fn.DataTable.isDataTable("#course-table")) {
                $('#course-table').DataTable().clear().destroy();
            }
            populatecourseTable();

        })

    }

          $("#update-course").click(function () {
         var id=$("#course-table tr.selected").attr("id");
        if ($("#course-form").valid()) {
        payload = {};
        payload['courseName'] = $("#courseName").val();
        payload['courseNumber'] = $("#courseNumber").val();
        updateCourse(id,payload)
        }


    })


     function deleteitem(id) {
        $.ajax({
            url: "/api/course/delete/"+id,
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
          
       }).done(function (data) {

            alert("Course deleted Succesfully");
            if ($.fn.DataTable.isDataTable("#course-table")) {
                $('#course-table').DataTable().clear().destroy();
            }
            populatecourseTable();

        })

    }

                function edititem(id) {
        $.ajax({
            url: "/api/course/"+id,
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
          
       }).done(function (data) {
        $("#courseName").val(data.data.courseName);
        $("#courseNumber").val(data.data.courseNumber);
        $("#submit-course").addClass("hide");
        $("#update-course").removeClass("hide");
       })

    }
     $("#edit").click(function()
    {
      if($("#course-table tr.selected").attr("id"))
      {
        $("#editModal").show();
      }
    })
      $("#proceedEdit").click(function()
    {

      edititem($("#course-table tr.selected").attr("id"));
      $("#editModal").hide();
    })

       $("#cancelEdit").click(function()
    {
        $("#editModal").hide();
    })


    $("#delete").click(function()
    {
      if($("#course-table tr.selected").attr("id"))
      {
        $("#deleteModal").show();
      }
    })
    $("#proceedDelete").click(function()
    {
      deleteitem($("#course-table tr.selected").attr("id"));
      $("#deleteModal").hide();
    })

    $("#cancelDelete").click(function()
    {
        $("#deleteModal").hide();
    })
    

})