$(window).on('load', function () {

      $("#department-form").validate({
        rules: {
            departmentName: {
                required: true,
                minlength: 3
            },
            
            
        },
        messages: {
            departmentName: {
                required: 'Please enter department name',
                minlength: 'department name must have more than 3 characters'
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


            body = body + "<tr id="+tablerow.id+"><td>" + tablerow.departmentName + "</td></tr>"


        })
        $("#department-table").find("tbody").empty().append(body);
         $("#department-table").DataTable();
      
       

    }

      $('#department-table tbody').on('click', 'tr', function () {
         if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            $("#department-table tr.selected").removeClass('selected');
            $(this).addClass('selected');
        }
        });

function populatedepartmentTable()
{
      $.ajax({
        url: "/api/department/",
        method: "GET"


    }).done(function (data) {
        populatetable(data['data']);
    }).fail(function (data) {
        console.error(data);
    })
}
populatedepartmentTable();


    function createDepartment(payload) {
        console.log(payload)
        $.ajax({
            url: "/api/department/",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(payload),


        }).done(function (data) {

           alert("Department Created Succesfully");
            if ($.fn.DataTable.isDataTable("#department-table")) {
                $('#department-table').DataTable().clear().destroy();
            }
            populatedepartmentTable()

        })

    }

    $("#submit-department").click(function () {
        if($("#department-form").valid())
        {
        payload = {};
        payload['departmentName'] = $("#departmentName").val();

        createDepartment(payload)
    }

    })
     function updateDepartment(id,payload) {
        $.ajax({
            url: "/api/department/"+id,
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(payload),


        }).done(function (data) {

            alert("Department Updated Succesfully");
            if ($.fn.DataTable.isDataTable("#department-table")) {
                $('#department-table').DataTable().clear().destroy();
            }
            populatedepartmentTable();

        })

    }
      $("#update-department").click(function () {
         var id=$("#department-table tr.selected").attr("id");
        if($("#department-form").valid())
        {
        payload = {};
        payload['departmentName'] = $("#departmentName").val();

        updateDepartment(id,payload)
    }

    })


     function deleteitem(id) {
        $.ajax({
            url: "/api/department/delete/"+id,
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
          
       }).done(function (data) {

            alert("Department deleted Succesfully");
            if ($.fn.DataTable.isDataTable("#department-table")) {
                $('#department-table').DataTable().clear().destroy();
            }
            populatedepartmentTable();

        })

    }

                function edititem(id) {
        $.ajax({
            url: "/api/department/"+id,
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
          
       }).done(function (data) {
        $("#departmentName").val(data.data.departmentName);
        $("#submit-department").addClass("hide");
        $("#update-department").removeClass("hide");
       })

    }
     $("#edit").click(function()
    {
      if($("#department-table tr.selected").attr("id"))
      {
        $("#editModal").show();
      }
    })
      $("#proceedEdit").click(function()
    {

      edititem($("#department-table tr.selected").attr("id"));
      $("#editModal").hide();
    })

       $("#cancelEdit").click(function()
    {
        $("#editModal").hide();
    })


    $("#delete").click(function()
    {
      if($("#department-table tr.selected").attr("id"))
      {
        $("#deleteModal").show();
      }
    })
    $("#proceedDelete").click(function()
    {
      deleteitem($("#department-table tr.selected").attr("id"));
      $("#deleteModal").hide();
    })

    $("#cancelDelete").click(function()
    {
        $("#deleteModal").hide();
    })
    

})