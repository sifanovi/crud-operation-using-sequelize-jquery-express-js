$(window).on('load', function () {


    function populatetable(data) {
        var body = "";
        $.each(data, function (row, tablerow) {


            body = body + "<tr><td>" + tablerow.departmentName + "</td></tr>"


        })
        $("#department-table").find("tbody").empty().append(body);
        $('#department-table tbody').on('click', 'tr', function () {
         if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            $("#department-table tr.selected").removeClass('selected');
            $(this).addClass('selected');
        }
        });
       

    }

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
            populatedepartmentTable()

        })

    }

    $("#submit-department").click(function () {
        payload = {};
        payload['departmentName'] = $("#departmentName").val();

        createDepartment(payload)

    })

})