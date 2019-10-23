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


$(document).on("click", "#btnGetAllCars", function GetAllCars () {
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
        },

        failure: function (data) {
            alert(data.responseText);
        },
        error: function (data) {
            alert(data.responseText);
        }

    });
});

$(document).on("click", "#btnGetCar", function () {
    var id = $('#enterIdCarForGetOrUpdateCar').val();
    if (id > 0) {
        $.ajax({
            type: "GET",
            url: "/api/Cars/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (car) {
                if (car != null) {
                    $('#enterBrandForGetOrUpdateCar').val(car.brand);
                    $('#enterCarPlateForGetOrUpdateCar').val(car.carPlate);
                    $('#enterOwnerIdForGetOrUpdateCar').val(car.ownerId);
                    console.log(car);
                }
            },
            failure: function (car) {
                alert(car.responseText);
            },
            error: function (jqXHR, error, errorThrown) {
                if (jqXHR.status && jqXHR.status == 404) {
                    alert("Nothing found");//TODO CLEAR FIELD
                    $('#enterBrandForGetOrUpdateCar').val("");
                    $('#enterCarPlateForGetOrUpdateCar').val("");
                    $('#enterOwnerIdForGetOrUpdateCar').val("");
                } else {
                    alert(jqXHR.responseText);
                }
            }

        });
    } else alert("Enter all empty field!");

});

$(document).on("click", "#btnUpdateCar", function () {
    var id = $('#enterIdCarForGetOrUpdateCar').val();
    var brand = $('#enterBrandForGetOrUpdateCar').val();
    var carPlate = $('#enterCarPlateForGetOrUpdateCar').val();
    var ownerId = $('#enterOwnerIdForGetOrUpdateCar').val();
    var dataToPut = JSON.stringify({//TODO fix for DTO model
        brand: brand,
        carPlate: carPlate,
        garages: [],
        id: id,
        owner: null,
        ownerId: ownerId,
        photo: null
    });
    /*if (brand != "" && carPlate != "") {
    }*/
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
            error: function (car) {
                console.log(car.responseText);
                alert(car.responseText);
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
        error: function (car) {
            console.log(car.responseText);
            alert(car.responseText);
        }

    });
});