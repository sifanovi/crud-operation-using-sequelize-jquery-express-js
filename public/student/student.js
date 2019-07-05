$(window).on('load', function () {


    function populatetable(data) {
        var body = "";
        $.each(data, function (row, tablerow) {


            body = body + "<tr><td>" + tablerow.id + "</td><td>" + tablerow.batchId + "</td><td>" + tablerow.studentName + "</td><td>" + tablerow.studentDateOfBirth + "</td><td>" + tablerow.studentAddress + "</td><td>" + tablerow.studentPhoneNumber + "</td><td>" + tablerow.sectionName + "</td></tr>"


        })
        $("#student-table").find("tbody").empty().append(body);
        $("#student-table").DataTable();
        $('#student-table tbody tr').bind('click');

    }

     $('tr [role=row]').click(function () {
            $(this).toggleClass('selected');
        });


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
            populatestudentTable();

        })

    }

    $("#submit-student").click(function () {
        payload = {};
        payload['batchId'] = $("#batchId").val();
        payload['studentName'] = $("#studentName").val();
        payload['studentDateOfBirth'] = $("#studentDateOfBirth").val();
        payload['studentAddress'] = $("#studentAddress").val();
        payload['studentPhoneNumber'] = $("#studentPhoneNumber").val();
        payload['sectionName'] = $("#sectionName").val();

        createStudent(payload);

    })

})