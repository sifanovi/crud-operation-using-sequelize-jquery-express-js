$(window).on('load', function () {

          $("#faculty-form").validate({
        rules: {
            departmentId:"required",
            teacherName:"required",
            address:"required",
            phoneNumber:"required",
            jobDescription:"required",

            
            
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


            body = body + "<tr id="+tablerow.id+"><td>" + tablerow.deparmentId + "</td><td>" + tablerow.teacherName + "</td><td>" + tablerow.address + "</td><td>" + tablerow.phoneNumber+ "</td><td>" + tablerow.jobDescription + "</td></tr>"


        })
        $("#faculty-table").find("tbody").empty().append(body);
        $("#faculty-table").DataTable();
        

    }

  $('#faculty-table tbody').on('click', 'tr', function () {
         if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            $("#faculty-table tr.selected").removeClass('selected');
            $(this).addClass('selected');
        }
        });   

function populatedepartments()
{
     $.ajax({
        url: "/api/department/",
        method: "GET"


    }).done(function (response) {
        
        var choices="";
        $.each(response['data'],function(id,column)
        {
            choices=choices+"<option value='"+column.id+"'>"+column.departmentName+"</option>";

        })
        console.log(choices);
        $("#departmentId").append(choices);
      
        
    }).fail(function (data) {
        console.error(data);
    }) 
} 

populatedepartments();   

function populatefacultymentTable()
{
      $.ajax({
        url: "/api/faculty/",
        method: "GET"


    }).done(function (data) {
        populatetable(data.data);
    }).fail(function (data) {
        console.error(data);
    })
}
populatefacultymentTable();


    function createFaculty(payload) {
        console.log(payload)
        $.ajax({
            url: "/api/faculty/",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(payload),


        }).done(function (data) {

           alert("Faculty Created Succesfully");
            if ($.fn.DataTable.isDataTable("#faculty-table")) {
                $('#faculty-table').DataTable().clear().destroy();
            }
            populatefacultymentTable();

        })

    }

      function updateFaculty(id,payload) {
        $.ajax({
            url: "/api/faculty/"+id,
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(payload),


        }).done(function (data) {

            alert("Faculty Updated Succesfully");
            if ($.fn.DataTable.isDataTable("#faculty-table")) {
                $('#faculty-table').DataTable().clear().destroy();
            }
            populatefacultymentTable();

        })

    }
      $("#update-faculty").click(function () {
         var id=$("#faculty-table tr.selected").attr("id");
             if($("#faculty-form").valid())
        {
        payload = {};
        payload['deparmentId'] = $("#departmentId").val();
        payload['teacherName'] = $("#teacherName").val();
        payload['address'] = $("#address").val();
        payload['phoneNumber'] = $("#phoneNumber").val();
        payload['jobDescription'] = $("#jobDescription").val();
   }
    updateFaculty(id,payload)
    

    })

    $("#submit-faculty").click(function () {
        if($("#faculty-form").valid())
        {
        payload = {};
        payload['deparmentId'] = $("#departmentId").val();
        payload['teacherName'] = $("#teacherName").val();
        payload['address'] = $("#address").val();
        payload['phoneNumber'] = $("#phoneNumber").val();
        payload['jobDescription'] = $("#jobDescription").val();

        createFaculty(payload);
    }

    })
     function deleteitem(id) {
        $.ajax({
            url: "/api/faculty/delete/"+id,
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
          
       }).done(function (data) {

            alert("Faculty deleted Succesfully");
            if ($.fn.DataTable.isDataTable("#faculty-table")) {
                $('#faculty-table').DataTable().clear().destroy();
            }
            populatefacultymentTable();

        })

    }


                function edititem(id) {
        $.ajax({
            url: "/api/faculty/"+id,
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
          
       }).done(function (data) {
        $("#teacherName").val(data.data.teacherName);
         $("#address").val(data.data.address);
          $("#phoneNumber").val(data.data.phoneNumber);
           $("#jobDescription").val(data.data.jobDescription);
      $("#submit-faculty").addClass("hide");
        $("#update-faculty").removeClass("hide");
       })

    }
     $("#edit").click(function()
    {
      if($("#faculty-table tr.selected").attr("id"))
      {
        $("#editModal").show();
      }
    })
      $("#proceedEdit").click(function()
    {

      edititem($("#faculty-table tr.selected").attr("id"));
      $("#editModal").hide();
    })

       $("#cancelEdit").click(function()
    {
        $("#editModal").hide();
    })



    $("#delete").click(function()
    {
      if($("#faculty-table tr.selected").attr("id"))
      {
        $("#deleteModal").show();
      }
    })
    $("#proceedDelete").click(function()
    {
      deleteitem($("#faculty-table tr.selected").attr("id"));
      $("#deleteModal").hide();
    })

    $("#cancelDelete").click(function()
    {
        $("#deleteModal").hide();
    })
    

})