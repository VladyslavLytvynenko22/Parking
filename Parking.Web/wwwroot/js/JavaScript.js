var HeadersOfColumns =
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


$(document).on("click", "#btnGetAllCars", function GetAllCars() {
    $.ajax({
        type: "GET",
        url: "/api/Cars",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#TableGetAllCars tr").remove();
            var rows = HeadersOfColumns;
            $.each(data, function (i, item) {
                rows += ParseCarToTr(item);
            });
            $('#TableGetAllCars').append(rows);
            console.log(data);
        }
    });
});

$(document).on("click", "#btnGetCar", function () {
    var id = $('#enterIdCarForGetOrUpdateOrDeleteCar').val();
    if (id > 0) {
        $.ajax({
            type: "GET",
            url: "/api/Cars/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (car) {
                if (car != null) {
                    $('#enterBrandForGetOrUpdateOrDeleteCar').val(car.brand);
                    $('#enterCarPlateForGetOrUpdateOrDeleteCar').val(car.carPlate);
                    $('#enterOwnerIdForGetOrUpdateOrDeleteCar').val(car.ownerId);
                    console.log(car);
                }
            },
            failure: function (car) {
                alert(car.responseText);
            },
            error: function (jxqr, error, status) {
                console.log(jxqr);
                var errorText = null;
                if (jxqr.responseText === "") {
                    errorText = jxqr.statusText;
                }
                else {
                    var response = JSON.parse(jxqr.responseText);
                    if (response['']) {

                        $.each(response[''], function (index, item) {
                            errorText += "\n" + item;
                        });
                    }
                    if (response['id']) {

                        $.each(response['id'], function (index, item) {
                            errorText += "\n" + item;
                        });
                    }
                }
                alert(errorText);
                $('#enterBrandForGetOrUpdateOrDeleteCar').val("");
                $('#enterCarPlateForGetOrUpdateOrDeleteCar').val("");
                $('#enterOwnerIdForGetOrUpdateOrDeleteCar').val("");
            }
        });
    } else alert("Enter all empty field!");
});

$(document).on("click", "#btnUpdateCar", function () {
    var id = $('#enterIdCarForGetOrUpdateOrDeleteCar').val();
    var brand = $('#enterBrandForGetOrUpdateOrDeleteCar').val();
    var carPlate = $('#enterCarPlateForGetOrUpdateOrDeleteCar').val();
    var ownerId = $('#enterOwnerIdForGetOrUpdateOrDeleteCar').val();
    var dataToPut = JSON.stringify({//TODO fix for DTO model
        brand: brand,
        carPlate: carPlate,
        garages: [],
        id: id,
        owner: null,
        ownerId: ownerId,
        photo: null
    });
    if (id > 0) {
        $.ajax({
            type: "PUT",
            url: "/api/Cars/" + id,
            dataType: "json",
            data: dataToPut,
            cache: false,
            contentType: "application/json; charset=utf-8",
            Accept: "application/json",
            failure: function (car) {
                console.log(car.responseText);
                alert(car.responseText);
            },
            error: function (jxqr, error, status) {
                console.log(jxqr);
                var errorText = null;
                if (jxqr.responseText === "") {
                    errorText = jxqr.statusText;
                }
                else {
                    var response = JSON.parse(jxqr.responseText);
                    if (response['']) {

                        $.each(response[''], function (index, item) {
                            errorText += "\n" + item;
                        });
                    }
                    if (response['id']) {

                        $.each(response['id'], function (index, item) {
                            errorText += "\n" + item;
                        });
                    }
                    if (response['brand']) {

                        $.each(response['brand'], function (index, item) {
                            errorText += "\n" + item;
                        });
                    }
                    if (response['carPlate']) {

                        $.each(response['carPlate'], function (index, item) {
                            errorText += "\n" + item;
                        });
                    }
                    if (response['ownerId']) {

                        $.each(response['ownerId'], function (index, item) {
                            errorText += "\n" + item;
                        });
                    }
                    if (response['photo']) {

                        $.each(response['photo'], function (index, item) {
                            errorText += "\n" + item;
                        });
                    }
                }
                alert(errorText);
            }
        });
    } else alert("Enter all empty field!");
});

$(document).on("click", "#btnDeleteCar", function () {
    var id = $('#enterIdCarForGetOrUpdateOrDeleteCar').val();
    if (id > 0) {
        $.ajax({
            type: "DELETE",
            url: "/api/Cars/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (car) {
                if (car != null) {
                    $('#enterBrandForGetOrUpdateOrDeleteCar').val(car.brand);
                    $('#enterCarPlateForGetOrUpdateOrDeleteCar').val(car.carPlate);
                    $('#enterOwnerIdForGetOrUpdateOrDeleteCar').val(car.ownerId);
                    console.log(car);
                }
            },
            failure: function (car) {
                alert(car.responseText);
            },
            error: function (jxqr, error, status) {
                console.log(jxqr);
                var errorText = null;
                if (jxqr.responseText === "") {
                    errorText = jxqr.statusText;
                }
                else {
                    var response = JSON.parse(jxqr.responseText);
                    if (response['']) {

                        $.each(response[''], function (index, item) {
                            errorText += "\n" + item;
                        });
                    }
                    if (response['id']) {

                        $.each(response['id'], function (index, item) {
                            errorText += "\n" + item;
                        });
                    }
                }
                alert(errorText);
                $('#enterBrandForGetOrUpdateOrDeleteCar').val("");
                $('#enterCarPlateForGetOrUpdateOrDeleteCar').val("");
                $('#enterOwnerIdForGetOrUpdateOrDeleteCar').val("");
            }
        });
    } else alert("Enter all empty field!");

});

$(document).on("click", "#btnCreateCar", function () {
    var brand = $('#enterBrandForCreateCar').val();
    var carPlate = $('#enterCarPlateForCreateCar').val();
    var ownerId = $('#enterOwnerIdForCreateCar').val();
    var dataToPost = JSON.stringify({//TODO fix for DTO model
        brand: brand,
        carPlate: carPlate,
        garages: [],
        id: -1,
        owner: null,
        ownerId: ownerId,
        photo: null
    });
    $.ajax({
        type: "POST",
        url: "/api/Cars",
        dataType: "json",
        data: dataToPost,
        cache: false,
        contentType: "application/json; charset=utf-8",
        Accept: "application/json",
        success: function (car) {
            console.log(car);
            if (car != null) {
                $('#enterIdCarForCreateCar').val(car.id);
            }
        },
        failure: function (car) {
            console.log(car.responseText);
            alert(car.responseText);
        },
        error: function (jxqr, error, status) {
            console.log(jxqr);
            var errorText = null;
            if (jxqr.responseText === "") {
                errorText = jxqr.statusText;
            }
            else {
                var response = JSON.parse(jxqr.responseText);
                if (response['']) {

                    $.each(response[''], function (index, item) {
                        errorText += "\n" + item;
                    });
                }
                if (response['id']) {

                    $.each(response['id'], function (index, item) {
                        errorText += "\n" + item;
                    });
                }
                if (response['brand']) {

                    $.each(response['brand'], function (index, item) {
                        errorText += "\n" + item;
                    });
                }
                if (response['carPlate']) {

                    $.each(response['carPlate'], function (index, item) {
                        errorText += "\n" + item;
                    });
                }
                if (response['ownerId']) {

                    $.each(response['ownerId'], function (index, item) {
                        errorText += "\n" + item;
                    });
                }
                if (response['photo']) {

                    $.each(response['photo'], function (index, item) {
                        errorText += "\n" + item;
                    });
                }
            }
            alert(errorText);
        }

    });
});