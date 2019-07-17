$(window).on('load', function () {

       $("#student-form").validate({
        rules: {
            batchId:"required",
            studentName:"required",
            studentAddress:"required",
            studentDateOfBirth:"required",
            studentPhoneNumber:"required",
            sectionName:"required",

            
            
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


            body = body + "<tr id="+tablerow.id+"><td>" + tablerow.id + "</td><td>" + tablerow.batchId + "</td><td>" + tablerow.studentName + "</td><td>" + tablerow.studentDateOfBirth + "</td><td>" + tablerow.studentAddress + "</td><td>" + tablerow.studentPhoneNumber + "</td><td>" + tablerow.sectionName + "</td></tr>"


        })
        $("#student-table").find("tbody").empty().append(body);
        $("#student-table").DataTable();
   

    }

     $('#student-table tbody').on('click', 'tr', function () {
         if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            $("#student-table tr.selected").removeClass('selected');
            $(this).addClass('selected');
        }
        });  

function populatesbatches()
{
     $.ajax({
        url: "/api/batch/",
        method: "GET"


    }).done(function (response) {
        console.log(response);
        var choices="";
        $.each(response['data'],function(id,column)
        {
            choices=choices+"<option value='"+column.id+"'>"+column.batchName+"</option>";

        })
        console.log(choices);
        $("#batchId").append(choices);
      
        
    }).fail(function (data) {
        console.error(data);
    }) 
}     

populatesbatches();
function populatestudentTable()
{
      $.ajax({
        url: "/api/student/",
        method: "GET"


    }).done(function (data) {
        populatetable(data);
    }).fail(function (data) {
        console.error(data);
    })
}
populatestudentTable();


    function createStudent(payload) {
        console.log(payload)
        $.ajax({
            url: "/api/student/",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(payload),


        }).done(function (data) {

           alert("Student Created Succesfully");
            if ($.fn.DataTable.isDataTable("#student-table")) {
                $('#student-table').DataTable().clear().destroy();
            }
            populatestudentTable();

        })

    }

       function updateStudent(id,payload) {
        $.ajax({
            url: "/api/student/"+id,
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(payload),


        }).done(function (data) {

            alert("Student Updated Succesfully");
            if ($.fn.DataTable.isDataTable("#student-table")) {
                $('#student-table').DataTable().clear().destroy();
            }
            populatestudentTable();

        })

    }
      $("#update-student").click(function () {
         var id=$("#student-table tr.selected").attr("id");
             if($("#student-form").valid())
        {
           payload = {};
        payload['batchId'] = $("#batchId").val();
        payload['studentName'] = $("#studentName").val();
        payload['studentDateOfBirth'] = $("#studentDateOfBirth").val();
        payload['studentAddress'] = $("#studentAddress").val();
        payload['studentPhoneNumber'] = $("#studentPhoneNumber").val();
        payload['sectionName'] = $("#sectionName").val();
          updateStudent(id,payload)
   }
    
    

    })

    $("#submit-student").click(function () {
        if ($("#student-form").valid())
        {
        payload = {};
        payload['batchId'] = $("#batchId").val();
        payload['studentName'] = $("#studentName").val();
        payload['studentDateOfBirth'] = $("#studentDateOfBirth").val();
        payload['studentAddress'] = $("#studentAddress").val();
        payload['studentPhoneNumber'] = $("#studentPhoneNumber").val();
        payload['sectionName'] = $("#sectionName").val();

        createStudent(payload);
    }

    })

        function edititem(id) {
        $.ajax({
            url: "/api/student/"+id,
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
          
       }).done(function (data) {
        $("#batchId").val(data.data.batchId);
         $("#studentName").val(data.data.studentName);
          $("#studentDateOfBirth").val(data.data.studentDateOfBirth);
            $("#studentAddress").val(data.data.studentAddress);
              $("#quizMarks").val(data.data.quizMarks);
            $("#studentPhoneNumber").val(data.data.studentPhoneNumber);
                 $("#sectionName").val(data.data.sectionName);
                 $("#submit-student").addClass("hide");
        $("#update-student").removeClass("hide");

           
     
       })

    }
     $("#edit").click(function()
    {
      if($("#student-table tr.selected").attr("id"))
      {
        $("#editModal").show();
      }
    })
      $("#proceedEdit").click(function()
    {

      edititem($("#student-table tr.selected").attr("id"));
      $("#editModal").hide();
    })

       $("#cancelEdit").click(function()
    {
        $("#editModal").hide();
    })


     function deleteitem(id) {
        $.ajax({
            url: "/api/student/delete/"+id,
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
          
       }).done(function (data) {

            alert("Student deleted Succesfully");
            if ($.fn.DataTable.isDataTable("#student-table")) {
                $('#student-table').DataTable().clear().destroy();
            }
            populatestudentTable();

        })

    }

    $("#delete").click(function()
    {
      if($("#student-table tr.selected").attr("id"))
      {
        $("#deleteModal").show();
      }
    })
    $("#proceedDelete").click(function()
    {
      deleteitem($("#student-table tr.selected").attr("id"));
      $("#deleteModal").hide();
    })

    $("#cancelDelete").click(function()
    {
        $("#deleteModal").hide();
    })
    

})