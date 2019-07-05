$(window).on('load', function () {


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

function populatebatchTable()
{
      $.ajax({
        url: "/api/batch/",
        method: "GET"


    }).done(function (data) {
        populatetable(data);
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
        payload = {};
        payload['batchName'] = $("#batchName").val();
        payload['session'] = $("#session").val();
        createBatch(payload)

    })

})