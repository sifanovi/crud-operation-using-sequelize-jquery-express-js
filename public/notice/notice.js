$(window).on('load', function () {


    $("#noticeForm").validate({
        rules: {
            content: {
                required: true,

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
        console.log(data);
        $.each(data, function (row, tablerow) {


            body = body + "<tr id=" + tablerow.id + "><td>" + tablerow.content + "</td></tr>";


        })
        $("#notice-table").find("tbody").empty().append(body);
        $("#notice-table").DataTable();


    }

    $('#notice-table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            $("#notice-table tr.selected").removeClass('selected');
            $(this).addClass('selected');
        }
    });

    function populatenoticeTable() {
        $.ajax({
            url: "/api/notice/",
            method: "GET"


        }).done(function (response) {
            console.log(response);
            populatetable(response.data);
        }).fail(function (data) {
            console.error(data);
        })
    }

    populatenoticeTable();


    function createNotice(payload) {
        $.ajax({
            url: "/api/notice/",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(payload),


        }).done(function (data) {

            alert("notice Created Succesfully");
            if ($.fn.DataTable.isDataTable("#notice-table")) {
                $('#notice-table').DataTable().clear().destroy();
            }
            populatenoticeTable();

        })

    }

    function updateNotice(id, payload) {
        $.ajax({
            url: "/api/notice/" + id,
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify(payload),


        }).done(function (data) {

            alert("notice Updated Succesfully");
            if ($.fn.DataTable.isDataTable("#notice-table")) {
                $('#notice-table').DataTable().clear().destroy();
            }
            populatenoticeTable();

        })

    }


    $("#submit-notice").click(function () {
        if ($("#noticeForm").valid()) {
            payload = {};
            payload['content'] = $("#content").val();

            createNotice(payload)

        }


    })
    $("#update-notice").click(function () {

        if ($("#noticeForm").valid()) {
            id = $("#notice-table tr.selected").attr("id");
            payload = {};
            payload['content'] = $("#content").val();
            updateNotice(id, payload)

        }


    })

    function deleteitem(id) {
        $.ajax({
            url: "/api/notice/delete/" + id,
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },

        }).done(function (data) {

            alert("Notice deleted Succesfully");
            if ($.fn.DataTable.isDataTable("#notice-table")) {
                $('#notice-table').DataTable().clear().destroy();
            }
            populatenoticeTable();

        })

    }


    $("#delete").click(function () {
        if ($("#notice-table tr.selected").attr("id")) {
            $("#deleteModal").show();
        }
    })

    function edititem(id) {
        $.ajax({
            url: "/api/notice/" + id,
            method: "GET",
            headers: {
                "content-type": "application/json"
            },

        }).done(function (data) {
            $("#content").val(data.data.content);

            $("#submit-notice").addClass("hide");
            $("#update-notice").removeClass("hide");
        })

    }

    $("#edit").click(function () {
        if ($("#notice-table tr.selected").attr("id")) {
            $("#editModal").show();
        }
    })
    $("#proceedEdit").click(function () {

        edititem($("#notice-table tr.selected").attr("id"));
        $("#editModal").hide();
    })

    $("#cancelEdit").click(function () {
        $("#editModal").hide();
    })


    $("#proceedDelete").click(function () {
        deleteitem($("#notice-table tr.selected").attr("id"));
        $("#deleteModal").hide();
    })

    $("#cancelDelete").click(function () {
        $("#deleteModal").hide();
    })

})