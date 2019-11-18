var headersOfColumnsCar =
    "<tr>" +
    "<th>Id</th>" +
    "<th>Brand</th>" +
    "<th>Car plate</th>" +
    "<th>Owner</th>" +
    "</tr>";

function parseCarToTr(car) {
    return "<tr>" +
        "<td id='Id'>" + car.id + "</td>" +
        "<td id='Brand'>" + car.brand + "</td>" +
        "<td id='Car plate'>" + car.carPlate + "</td>" +
        "<td id='Owner'>" + car.ownerId + "</td>" +
        "</tr>";
}

function setInputForGetOrUpdateOrDeleteCar(brand, carPlate, ownerId) {
    $('#enterBrandForGetOrUpdateOrDeleteCar').val(brand);
    $('#enterCarPlateForGetOrUpdateOrDeleteCar').val(carPlate);
    $('#enterOwnerIdForGetOrUpdateOrDeleteCar').val(ownerId);
}

function clearErrorMessage() {
    $('#result').html('');
    console.log('clearErrorMessage()');
}

function showErrorMessage(jqXHR, textStatus, errorThrown) {
    if (jqXHR.responseText != "") {
        $('#result').html('<p>status code: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
    }
    else alert(textStatus);
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorThrown);
}

function getAllCars() {
    $('*').css({ 'cursor': 'wait' });
    $.ajax({
        type: "GET",
        url: "/api/Cars/getcars",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr) {
            var token = sessionStorage.getItem(tokenKey);
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function (data) {
            $("#TableGetAllCars tr").remove();

            var rows = headersOfColumnsCar;

            $.each(data, function (i, item) {
                rows += parseCarToTr(item);
            });

            $('#TableGetAllCars').append(rows);

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

function getCar() {
    var id = $('#enterIdCarForGetOrUpdateOrDeleteCar').val();
    if (id > 0) {
        $('*').css({ 'cursor': 'wait' });
        $.ajax({
            type: "GET",
            url: "/api/Cars/getcar/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (car) {
                if (car != null) {
                    setInputForGetOrUpdateOrDeleteCar(car.brand, car.carPlate, car.ownerId);
                }
                console.log(car);
                clearErrorMessage();
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

function updateCar() {
    var id = $('#enterIdCarForGetOrUpdateOrDeleteCar').val();
    var brand = $('#enterBrandForGetOrUpdateOrDeleteCar').val();
    var carPlate = $('#enterCarPlateForGetOrUpdateOrDeleteCar').val();
    var ownerId = $('#enterOwnerIdForGetOrUpdateOrDeleteCar').val();

    var dataToPut = JSON.stringify({
        brand: brand,
        carPlate: carPlate,
        id: id,
        ownerId: ownerId,
        photo: null
    });
    if (id > 0) {
        $('*').css({ 'cursor': 'wait' });
        $.ajax({
            type: "PUT",
            url: "/api/Cars/updatecar/" + id,
            dataType: "json",
            data: dataToPut,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (result) {
                alert("Update OK!");
                console.log(result);
                clearErrorMessage();
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

function deleteCar() {
    var id = $('#enterIdCarForGetOrUpdateOrDeleteCar').val();
    if (id > 0) {
        $('*').css({ 'cursor': 'wait' });
        $.ajax({
            type: "DELETE",
            url: "/api/Cars/deletecar/" + id,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (result) {
                alert('Delete OK!');
                console.log(result);
                setInputForGetOrUpdateOrDeleteCar("", "", "");
                clearErrorMessage();
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

function createCar() {
    $('*').css({ 'cursor': 'wait' });
    var brand = $('#enterBrandForCreateCar').val();
    var carPlate = $('#enterCarPlateForCreateCar').val();
    var ownerId = $('#enterOwnerIdForCreateCar').val();
    var dataToPost = JSON.stringify({
        brand: brand,
        carPlate: carPlate,
        id: null,
        ownerId: ownerId,
        photo: null
    });
    $.ajax({
        type: "POST",
        url: "/api/Cars/createcar",
        dataType: "json",
        data: dataToPost,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            var token = sessionStorage.getItem(tokenKey);
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function (car) {
            if (car != null) {
                $('#enterIdCarForCreateCar').val(car.id);
            }
            console.log(car);
            alert("Create OK!");
            clearErrorMessage();
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

$(document).on("click", "#btnGetAllCars", function () {
    getAllCars();
});

$(document).on("click", "#btnGetCar", function () {
    getCar();
});

$(document).on("click", "#btnUpdateCar", function () {
    updateCar();
});

$(document).on("click", "#btnDeleteCar", function () {
    deleteCar();
});

$(document).on("click", "#btnCreateCar", function () {
    createCar();
});