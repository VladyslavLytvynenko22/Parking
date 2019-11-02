var HeadersOfColumnsGarage =
    "<tr>" +
    "<th>Id</th>" +
    "<th>Area</th>" +
    "<th>Color</th>" +
    "<th>Car</th>" +
    "</tr>";

function ParseGarageToTr(garage) {
    return "<tr>" +
        "<td id='Id'>" + garage.id + "</td>" +
        "<td id='Area'>" + garage.area + "</td>" +
        "<td id='Color'>" + garage.color + "</td>" +
        "<td id='Car'>" + garage.carId + "</td>" +
        "</tr>";
}

function SetInputForGetOrUpdateOrDeleteGarage(area, color, carId) {
    $('#enterAreaForGetOrUpdateOrDeleteGarage').val(area);
    $('#enterColorForGetOrUpdateOrDeleteGarage').val(color);
    $('#enterCarIdForGetOrUpdateOrDeleteGarage').val(carId);
}

function GetAllGarages() {
    $('*').css({ 'cursor': 'wait' });
    $.ajax({
        type: "GET",
        url: "/api/Garages",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#TableGetAllGarages tr").remove();
            var rows = HeadersOfColumnsGarage;
            $.each(data, function (i, item) {
                rows += ParseGarageToTr(item);
            });
            $('#TableGetAllGarages').append(rows);
            console.log(data);
        },
        error: function (xhr, status, error) {
            showErrorMessage(xhr, status, error);
        },
        complete: function (data) {
            $('*').css({ 'cursor': 'default' });
        }
    });
}

function GetGarage() {
    var id = $('#enterIdGarageForGetOrUpdateOrDeleteGarage').val();
    if (id > 0) {
        $('*').css({ 'cursor': 'wait' });
        $.ajax({
            type: "GET",
            url: "/api/Garages/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (garage) {
                if (garage != null) {
                    SetInputForGetOrUpdateOrDeleteGarage(garage.area, garage.color, garage.carId);
                    console.log(garage);
                }
            },
            error: function (xhr, status, error) {
                showErrorMessage(xhr, status, error);
                SetInputForGetOrUpdateOrDeleteGarage("", "", "");
            },
            complete: function (data) {
                $('*').css({ 'cursor': 'default' });
            }
        });
    } else alert("Enter all empty field!");
}

function UpdateGarage() {
    var id = $('#enterIdGarageForGetOrUpdateOrDeleteGarage').val();
    var area = $('#enterAreaForGetOrUpdateOrDeleteGarage').val();
    var color = $('#enterColorForGetOrUpdateOrDeleteGarage').val();
    var carId = $('#enterCarIdForGetOrUpdateOrDeleteGarage').val();

    var dataToPut = JSON.stringify({
        area: area,
        color: color,
        id: id,
        carId: carId,
        photo: null
    });
    if (id > 0) {
        $('*').css({ 'cursor': 'wait' });
        $.ajax({
            type: "PUT",
            url: "/api/Garages/" + id,
            dataType: "json",
            data: dataToPut,
            contentType: "application/json; charset=utf-8",
            success: function () {
                alert("Update OK!");
            },
            error: function (xhr, status, error) {
                showErrorMessage(xhr, status, error);
            },
            complete: function (data) {
                $('*').css({ 'cursor': 'default' });
            }
        });
    } else alert("Enter all empty field!");
}

function DeleteGarage() {
    var id = $('#enterIdGarageForGetOrUpdateOrDeleteGarage').val();
    if (id > 0) {
        $('*').css({ 'cursor': 'wait' });
        $.ajax({
            type: "DELETE",
            url: "/api/Garages/" + id,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                alert('Delete OK!');
                SetInputForGetOrUpdateOrDeleteGarage("", "", "");
            },
            error: function (xhr, status, error) {
                showErrorMessage(xhr, status, error);
            },
            complete: function (data) {
                $('*').css({ 'cursor': 'default' });
            }
        });
    } else alert("Enter all empty field!");
}

function CreateGarage() {
    $('*').css({ 'cursor': 'wait' });
    var area = $('#enterAreaForCreateGarage').val();
    var color = $('#enterColorForCreateGarage').val();
    var carId = $('#enterCarIdForCreateGarage').val();

    var dataToPost = JSON.stringify({
        area: area,
        color: color,
        id: null,
        carId: carId
    });
    $.ajax({
        type: "POST",
        url: "/api/Garages",
        dataType: "json",
        data: dataToPost,
        contentType: "application/json; charset=utf-8",
        success: function (garage) {
            console.log(garage);
            if (garage != null) {
                $('#enterIdGarageForCreateGarage').val(garage.id);
            }
            alert("Create OK!");
        },
        error: function (xhr, status, error) {
            showErrorMessage(xhr, status, error);
        },
        complete: function (data) {
            $('*').css({ 'cursor': 'default' });
        }
    });
}

$(document).on("click", "#btnGetAllGarages", function () {
    GetAllGarages();
});

$(document).on("click", "#btnGetGarage", function () {
    GetGarage();
});

$(document).on("click", "#btnUpdateGarage", function () {
    UpdateGarage();
});

$(document).on("click", "#btnDeleteGarage", function () {
    DeleteGarage();
});

$(document).on("click", "#btnCreateGarage", function () {
    CreateGarage();
});