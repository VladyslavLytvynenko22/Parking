var HeadersOfColumnsOwner =
    "<tr>" +
    "<th>Id</th>" +
    "<th>First Name</th>" +
    "<th>Last Name</th>" +
    "<th>Date Of Birth</th>" +
    "</tr>";

function ParseOwnerToTr(owner) {
    return "<tr>" +
        "<td id='Id'>" + owner.id + "</td>" +
        "<td id='FirstName'>" + owner.firstName + "</td>" +
        "<td id='LastName'>" + owner.lastName + "</td>" +
        "<td id='DateOfBirth'>" + owner.dateOfBirth + "</td>" +
        "</tr>";
}

function SetInputForGetOrUpdateOrDeleteOwner(firstName, lastName, dateOfBirth) {
    $('#enterFirstNameForGetOrUpdateOrDeleteOwner').val(firstName);
    $('#enterLastNameForGetOrUpdateOrDeleteOwner').val(lastName);
    $('#enterDateOfBirthForGetOrUpdateOrDeleteOwner').val(dateOfBirth);
}

function GetAllOwners() {
    $('*').css({ 'cursor': 'wait' });
    $.ajax({
        type: "GET",
        url: "/api/Owners",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#TableGetAllOwners tr").remove();
            var rows = HeadersOfColumnsOwner;
            $.each(data, function (i, item) {
                rows += ParseOwnerToTr(item);
            });
            $('#TableGetAllOwners').append(rows);
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

function GetGar() {
    var id = $('#enterIdOwnerForGetOrUpdateOrDeleteOwner').val();
    if (id > 0) {
        $('*').css({ 'cursor': 'wait' });
        $.ajax({
            type: "GET",
            url: "/api/Owners/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (owner) {
                if (owner != null) {
                    SetInputForGetOrUpdateOrDeleteOwner(owner.firstName, owner.lastName, owner.dateOfBirth);
                    console.log(owner);
                }
            },
            error: function (xhr, status, error) {
                showErrorMessage(xhr, status, error);
                SetInputForGetOrUpdateOrDeleteOwner("", "", "");
            },
            complete: function (data) {
                $('*').css({ 'cursor': 'default' });
            }
        });
    } else alert("Enter all empty field!");
}

function UpdateOwner() {
    var id = $('#enterIdOwnerForGetOrUpdateOrDeleteOwner').val();
    var firstName = $('#enterFirstNameForGetOrUpdateOrDeleteOwner').val();
    var lastName = $('#enterLastNameForGetOrUpdateOrDeleteOwner').val();
    var dateOfBirth = $('#enterDateOfBirthForGetOrUpdateOrDeleteOwner').val();

    var dataToPut = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        id: id,
        dateOfBirth: dateOfBirth,
        photo: null
    });
    if (id > 0) {
        $('*').css({ 'cursor': 'wait' });
        $.ajax({
            type: "PUT",
            url: "/api/Owners/" + id,
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

function DeleteOwner() {
    var id = $('#enterIdOwnerForGetOrUpdateOrDeleteOwner').val();
    if (id > 0) {
        $('*').css({ 'cursor': 'wait' });
        $.ajax({
            type: "DELETE",
            url: "/api/Owners/" + id,
            contentType: "application/json; charset=utf-8",
            success: function () {
                alert('Delete OK!');
                SetInputForGetOrUpdateOrDeleteOwner("", "", "");
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

function CreateOwner() {
    $('*').css({ 'cursor': 'wait' });
    var firstName = $('#enterFirstNameForCreateOwner').val();
    var lastName = $('#enterLastNameForCreateOwner').val();
    var dateOfBirth = $('#enterDateOfBirthForCreateOwner').val();

    var dataToPost = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        id: null,
        dateOfBirth: dateOfBirth
    });
    $.ajax({
        type: "POST",
        url: "/api/Owners",
        dataType: "json",
        data: dataToPost,
        contentType: "application/json; charset=utf-8",
        success: function (owner) {
            console.log(owner);
            if (owner != null) {
                $('#enterIdOwnerForCreateOwner').val(owner.id);
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

$(document).on("click", "#btnGetAllOwners", function () {
    GetAllOwners();
});

$(document).on("click", "#btnGetOwner", function () {
    GetGar();
});

$(document).on("click", "#btnUpdateOwner", function () {
    UpdateOwner();
});

$(document).on("click", "#btnDeleteOwner", function () {
    DeleteOwner();
});

$(document).on("click", "#btnCreateOwner", function () {
    CreateOwner();
});