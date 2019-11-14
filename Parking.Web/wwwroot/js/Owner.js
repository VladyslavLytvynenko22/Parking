var headersOfColumnsOwner =
    "<tr>" +
    "<th>Id</th>" +
    "<th>First Name</th>" +
    "<th>Last Name</th>" +
    "<th>Date Of Birth</th>" +
    "</tr>";

function parseOwnerToTr(owner) {
    return "<tr>" +
        "<td id='Id'>" + owner.id + "</td>" +
        "<td id='FirstName'>" + owner.firstName + "</td>" +
        "<td id='LastName'>" + owner.lastName + "</td>" +
        "<td id='DateOfBirth'>" + owner.dateOfBirth + "</td>" +
        "</tr>";
}

function setInputForGetOrUpdateOrDeleteOwner(firstName, lastName, dateOfBirth) {
    $('#enterFirstNameForGetOrUpdateOrDeleteOwner').val(firstName);
    $('#enterLastNameForGetOrUpdateOrDeleteOwner').val(lastName);
    document.querySelector('#enterDateOfBirthForGetOrUpdateOrDeleteOwner').valueAsDate = dateOfBirth;
}

function getAllOwners() {
    $('*').css({ 'cursor': 'wait' });
    $.ajax({
        type: "GET",
        url: "/api/Owners/getowners",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr) {
            var token = sessionStorage.getItem(tokenKey);
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function (data) {
            $("#TableGetAllOwners tr").remove();
            var rows = headersOfColumnsOwner;
            $.each(data, function (i, item) {
                rows += parseOwnerToTr(item);
            });
            $('#TableGetAllOwners').append(rows);
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

function getOwner() {
    var id = $('#enterIdOwnerForGetOrUpdateOrDeleteOwner').val();
    if (id > 0) {
        $('*').css({ 'cursor': 'wait' });
        $.ajax({
            type: "GET",
            url: "/api/Owners/getowner/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (owner) {
                if (owner != null) {
                    setInputForGetOrUpdateOrDeleteOwner(owner.firstName, owner.lastName, new Date(owner.dateOfBirth));
                    clearErrorMessage();
                    console.log(owner);
                }
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

function updateOwner() {
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
            url: "/api/Owners/updateowner/" + id,
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

function deleteOwner() {
    var id = $('#enterIdOwnerForGetOrUpdateOrDeleteOwner').val();
    if (id > 0) {
        $('*').css({ 'cursor': 'wait' });
        $.ajax({
            type: "DELETE",
            url: "/api/Owners/deleteowner/" + id,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (result) {
                alert('Delete OK!');
                setInputForGetOrUpdateOrDeleteOwner("", "", "");
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

function createOwner() {
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
        url: "/api/Owners/createowner",
        dataType: "json",
        data: dataToPost,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            var token = sessionStorage.getItem(tokenKey);
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function (owner) {
            if (owner != null) {
                $('#enterIdOwnerForCreateOwner').val(owner.id);
            }
            alert("Create OK!");
            clearErrorMessage();
            console.log(owner);
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

$(document).on("click", "#btnGetAllOwners", function () {
    getAllOwners();
});

$(document).on("click", "#btnGetOwner", function () {
    getOwner();
});

$(document).on("click", "#btnUpdateOwner", function () {
    updateOwner();
});

$(document).on("click", "#btnDeleteOwner", function () {
    deleteOwner();
});

$(document).on("click", "#btnCreateOwner", function () {
    createOwner();
});