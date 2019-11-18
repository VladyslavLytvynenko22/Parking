var headersOfColumnsGarage =
    "<tr>" +
    "<th>Id</th>" +
    "<th>Area</th>" +
    "<th>Color</th>" +
    "<th>Car</th>" +
    "</tr>";

function parseGarageToTr(garage) {
    return "<tr>" +
        "<td id='Id'>" + garage.id + "</td>" +
        "<td id='Area'>" + garage.area + "</td>" +
        "<td id='Color'>" + garage.color + "</td>" +
        "<td id='Car'>" + garage.carId + "</td>" +
        "</tr>";
}

function setInputForGetOrUpdateOrDeleteGarage(area, color, carId) {
    $('#enterAreaForGetOrUpdateOrDeleteGarage').val(area);
    $('#enterColorForGetOrUpdateOrDeleteGarage').val(color);
    $('#enterCarIdForGetOrUpdateOrDeleteGarage').val(carId);
}

function getAllGarages() {
    $('*').css({ 'cursor': 'wait' });
    $.ajax({
        type: "GET",
        url: "/api/Garages/getgarages",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr) {
            var token = sessionStorage.getItem(tokenKey);
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function (data) {
            $("#TableGetAllGarages tr").remove();
            var rows = headersOfColumnsGarage;
            $.each(data, function (i, item) {
                rows += parseGarageToTr(item);
            });
            $('#TableGetAllGarages').append(rows);
            clearErrorMessage();
            console.log(data);
        },
        fail: function (xhr, status, error) {
            showErrorMessage(xhr, status, error);
        },
        error: function (xhr, status, error) {
            showErrorMessage(xhr, status, error);
        },
        complete: function (data) {
            $('*').css({ 'cursor': 'default' });
        }
    });
}

function getGarage() {
    var id = $('#enterIdGarageForGetOrUpdateOrDeleteGarage').val();
    if (id > 0) {
        $('*').css({ 'cursor': 'wait' });
        $.ajax({
            type: "GET",
            url: "/api/Garages/getgarage/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (garage) {
                if (garage != null) {
                    setInputForGetOrUpdateOrDeleteGarage(garage.area, garage.color, garage.carId);
                    clearErrorMessage();
                }
                console.log(garage);
            },
            fail: function (xhr, status, error) {
                showErrorMessage(xhr, status, error);
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

function updateGarage() {
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
            url: "/api/Garages/updategarage/" + id,
            dataType: "json",
            data: dataToPut,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (result) {
                alert("Update OK!");
                clearErrorMessage();
                console.log(result);
            },
            fail: function (xhr, status, error) {
                showErrorMessage(xhr, status, error);
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

function deleteGarage() {
    var id = $('#enterIdGarageForGetOrUpdateOrDeleteGarage').val();
    if (id > 0) {
        $('*').css({ 'cursor': 'wait' });
        $.ajax({
            type: "DELETE",
            url: "/api/Garages/deletegarage/" + id,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (result) {
                alert('Delete OK!');
                setInputForGetOrUpdateOrDeleteGarage("", "", "");
                clearErrorMessage();
                console.log(result);
            },
            fail: function (xhr, status, error) {
                showErrorMessage(xhr, status, error);
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

function createGarage() {
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
        url: "/api/Garages/creategarage",
        dataType: "json",
        data: dataToPost,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            var token = sessionStorage.getItem(tokenKey);
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function (garage) {
            if (garage != null) {
                $('#enterIdGarageForCreateGarage').val(garage.id);
            }
            clearErrorMessage();
            alert("Create OK!");
            console.log(garage);
        },
        fail: function (xhr, status, error) {
            showErrorMessage(xhr, status, error);
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
    getAllGarages();
});

$(document).on("click", "#btnGetGarage", function () {
    getGarage();
});

$(document).on("click", "#btnUpdateGarage", function () {
    updateGarage();
});

$(document).on("click", "#btnDeleteGarage", function () {
    deleteGarage();
});

$(document).on("click", "#btnCreateGarage", function () {
    createGarage();
});