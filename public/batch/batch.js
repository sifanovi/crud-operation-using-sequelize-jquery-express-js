$(window).on('load', function () {


    $("#batchForm").validate({
        rules: {
            batchName: {
                required: true,
                minlength: 3
            },
            session: "required",

        },
        messages: {
            batchName: {
                required: 'Please enter your batch name',
                minlength: 'Batch name must have more than 3 characters'
            },
            session: "Please enter your session",
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


            body = body + "<tr id="+tablerow.id+"><td>" + tablerow.batchName + "</td><td>" + tablerow.session + "</td></tr>"


        })
        $("#batch-table").find("tbody").empty().append(body);
        $("#batch-table").DataTable();
       

    }

     $('#batch-table tbody').on('click', 'tr', function () {
         if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            $("#batch-table tr.selected").removeClass('selected');
            $(this).addClass('selected');
        }
        });

    function populatebatchTable() {
        $.ajax({
            url: "/api/batch/",
            method: "GET"


        }).done(function (response) {
            populatetable(response.data);
        }).fail(function (data) {
            console.error(data);
        })
    }

    populatebatchTable();


    function createBatch(payload) {
        $.ajax({
            url: "/api/batch/",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(payload),


        }).done(function (data) {

            alert("Batch Created Succesfully");
            if ($.fn.DataTable.isDataTable("#batch-table")) {
                $('#batch-table').DataTable().clear().destroy();
            }
            populatebatchTable();

        })

    }

    function updateBatch(id,payload) {
        $.ajax({
            url: "/api/batch/"+id,
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(payload),


        }).done(function (data) {

            alert("Batch Updated Succesfully");
            if ($.fn.DataTable.isDataTable("#batch-table")) {
                $('#batch-table').DataTable().clear().destroy();
            }
            populatebatchTable();

        })

    }
       

    $("#submit-batch").click(function () {
        if ($("#batchForm").valid()) {
            payload = {};
            payload['batchName'] = $("#batchName").val();
            payload['session'] = $("#session").val();
            createBatch(payload)

        }


    })
       $("#update-batch").click(function () {

        if ($("#batchForm").valid()) {
            id=$("#batch-table tr.selected").attr("id");
            payload = {};
            payload['batchName'] = $("#batchName").val();
            payload['session'] = $("#session").val();
            updateBatch(id,payload)

        }


    })

     function deleteitem(id) {
        $.ajax({
            url: "/api/batch/delete/"+id,
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
          
       }).done(function (data) {

            alert("Batch deleted Succesfully");
            if ($.fn.DataTable.isDataTable("#batch-table")) {
                $('#batch-table').DataTable().clear().destroy();
            }
            populatebatchTable();

        })

    }



    $("#delete").click(function()
    {
      if($("#batch-table tr.selected").attr("id"))
      {
        $("#deleteModal").show();
      }
    })

            function edititem(id) {
        $.ajax({
            url: "/api/batch/"+id,
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
          
       }).done(function (data) {
        $("#batchName").val(data.data.batchName);
        $("#session").val(data.data.session);
        $("#submit-batch").addClass("hide");
        $("#update-batch").removeClass("hide");
       })

    }
     $("#edit").click(function()
    {
      if($("#batch-table tr.selected").attr("id"))
      {
        $("#editModal").show();
      }
    })
      $("#proceedEdit").click(function()
    {

      edititem($("#batch-table tr.selected").attr("id"));
      $("#editModal").hide();
    })

       $("#cancelEdit").click(function()
    {
        $("#editModal").hide();
    })




    $("#proceedDelete").click(function()
    {
      deleteitem($("#batch-table tr.selected").attr("id"));
      $("#deleteModal").hide();
    })

    $("#cancelDelete").click(function()
    {
        $("#deleteModal").hide();
    })

})