$(window).on('load', function () {


    function populatetable(data) {
        var body = "";
        $.each(data, function (row, tablerow) {


            body = body + "<tr><td>" + tablerow.deparmentId + "</td><td>" + tablerow.teacherName + "</td><td>" + tablerow.address + "</td><td>" + tablerow.phoneNumber+ "</td><td>" + tablerow.jobDescription + "</td></tr>"


        })
        $("#faculty-table").find("tbody").empty().append(body);
        $("#faculty-table").DataTable();
         $('#faculty-table tbody').on('click', 'tr', function () {
         if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            $("#faculty-table tr.selected").removeClass('selected');
            $(this).addClass('selected');
        }
        });

    }

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
        populatetable(data);
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
            populatefacultymentTable();

        })

    }

    $("#submit-faculty").click(function () {
        payload = {};
        payload['deparmentId'] = $("#departmentId").val();
        payload['teacherName'] = $("#teacherName").val();
        payload['address'] = $("#address").val();
        payload['phoneNumber'] = $("#phoneNumber").val();
        payload['jobDescription'] = $("#jobDescription").val();

        createFaculty(payload);

    })

})