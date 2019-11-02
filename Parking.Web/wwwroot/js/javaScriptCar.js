var HeadersOfColumnsCar =
    "<tr>" +
    "<th>Id</th>" +
    "<th>Brand</th>" +
    "<th>Car plate</th>" +
    "<th>Owner</th>" +
    "</tr>";

function ParseCarToTr(car) {
    return "<tr>" +
        "<td id='Id'>" + car.id + "</td>" +
        "<td id='Brand'>" + car.brand + "</td>" +
        "<td id='Car plate'>" + car.carPlate + "</td>" +
        "<td id='Owner'>" + car.ownerId + "</td>" +
        "</tr>";
}

function SetInputForGetOrUpdateOrDeleteCar(brand, carPlate, ownerId) {
    $('#enterBrandForGetOrUpdateOrDeleteCar').val(brand);
    $('#enterCarPlateForGetOrUpdateOrDeleteCar').val(carPlate);
    $('#enterOwnerIdForGetOrUpdateOrDeleteCar').val(ownerId);
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

function GetAllCars() {
    $('*').css({ 'cursor': 'wait' });
    $.ajax({
        type: "GET",
        url: "/api/Cars",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#TableGetAllCars tr").remove();

            var rows = HeadersOfColumnsCar;

            $.each(data, function (i, item) {
                rows += ParseCarToTr(item);
            });

            $('#TableGetAllCars').append(rows);

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

function GetCar() {
    var id = $('#enterIdCarForGetOrUpdateOrDeleteCar').val();
    if (id > 0) {
        $('*').css({ 'cursor': 'wait' });
        $.ajax({
            type: "GET",
            url: "/api/Cars/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (car) {
                if (car != null) {
                    SetInputForGetOrUpdateOrDeleteCar(car.brand, car.carPlate, car.ownerId);
                    console.log(car);
                }
            },
            error: function (xhr, status, error) {
                showErrorMessage(xhr, status, error);
                SetInputForGetOrUpdateOrDeleteCar("", "", "");
            },
            complete: function (data) {
                $('*').css({ 'cursor': 'default' });
            }
        });
    } else alert("Enter all empty field!");
}

function UpdateCar() {
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
            url: "/api/Cars/" + id,
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

function DeleteCar() {
    var id = $('#enterIdCarForGetOrUpdateOrDeleteCar').val();
    if (id > 0) {
        $('*').css({ 'cursor': 'wait' });
        $.ajax({
            type: "DELETE",
            url: "/api/Cars/" + id,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                alert('Delete OK!');
                SetInputForGetOrUpdateOrDeleteCar("", "", "");
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

function CreateCar() {
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
        url: "/api/Cars",
        dataType: "json",
        data: dataToPost,
        contentType: "application/json; charset=utf-8",
        success: function (car) {
            if (car != null) {
                $('#enterIdCarForCreateCar').val(car.id);
            }
            console.log(car);
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

$(document).on("click", "#btnGetAllCars", function () {
    GetAllCars();
});

$(document).on("click", "#btnGetCar", function () {
    GetCar();
});

$(document).on("click", "#btnUpdateCar", function () {
    UpdateCar();
});

$(document).on("click", "#btnDeleteCar", function () {
    DeleteCar();
});

$(document).on("click", "#btnCreateCar", function () {
    CreateCar();
});