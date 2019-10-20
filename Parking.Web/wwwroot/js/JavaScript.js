$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/api/Cars",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#DIV").html('');
            var DIV = '';
            $.each(data, function (i, item) {
                var rows = "<tr>" +
                    "<td id='Id'>" + item.id + "</td>" +
                    "<td id='Brand'>" + item.brand + "</td>" +
                    "<td id='Car plate'>" + item.carPlate + "</td>" +
                    "</tr>";
                $('#Table').append(rows);
            });
            console.log(data);
        },

        failure: function (data) {
            alert(data.responseText);
        },
        error: function (data) {
            alert(data.responseText);
        }

    });
});