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


            body = body + "<tr><td>" + tablerow.batchName + "</td><td>" + tablerow.session + "</td></tr>"


        })
        $("#batch-table").find("tbody").empty().append(body);
        $("#batch-table").DataTable();
        $('#batch-table tbody').on('click', 'tr', function () {
            $(this).toggleClass('selected');
        });

    }

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

    $("#submit-batch").click(function () {
        if ($("#batchForm").valid()) {
            payload = {};
            payload['batchName'] = $("#batchName").val();
            payload['session'] = $("#session").val();
            createBatch(payload)

        }


    })

})