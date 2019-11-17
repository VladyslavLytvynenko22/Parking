var tokenKey = "accessToken";
var userName = "username";
var check = false;

function submRegistration(e) {
    e.preventDefault();
    var loginData = JSON.stringify({
        id: null,
        login: $('#emailLogin').val(),
        password: $('#passwordLogin').val(),
        role: 'user'
    });

    $.ajax({
        type: 'POST',
        url: '/api/Person/createperson',
        data: loginData,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('.userName').text(data.login);
            $('.userInfo').css('display', 'block');
            $('.loginForm').css('display', 'none');
            sessionStorage.setItem(tokenKey, data.access_token);
            clearErrorMessage();
            console.log(data.access_token)
        },
        fail: function (xhr, status, error) {
            showErrorMessage(xhr, status, error);
        },
        error: function (xhr, status, error) {
            showErrorMessage(xhr, status, error);
        }
    });
};

function submitLogin(e) {
    e.preventDefault();
    var dataToPut = JSON.stringify({
        id: null,
        login: $('#emailLogin').val(),
        password: $('#passwordLogin').val(),
        role: null
    });

    $.ajax({
        type: 'POST',
        url: '/api/Account/token',
        data: dataToPut,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('.userName').text(data.username);
            $('.userInfo').css('display', 'block');
            $('.loginForm').css('display', 'none');
            sessionStorage.setItem(tokenKey, data.access_token);
            sessionStorage.setItem(userName, data.username);
            clearErrorMessage();
            console.log(data);
        },
        fail: function (xhr, status, error) {
            showErrorMessage(xhr, status, error);
        },
        error: function (xhr, status, error) {
            showErrorMessage(xhr, status, error);
        }
    });
};

function logOut(e) {
    e.preventDefault();
    $('.loginForm').css('display', 'block');
    $('.userInfo').css('display', 'none');
    sessionStorage.removeItem(tokenKey);
    sessionStorage.removeItem(userName);
};

function checkAuthorize() {
    if (sessionStorage.getItem(userName) != null) {
        $.ajax({
            type: "GET",
            url: "/api/Account/checkAuthorize",
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (data) {
                $('.userName').text(sessionStorage.getItem(userName));
                $('.userInfo').css('display', 'block');
                $('.loginForm').css('display', 'none');
                console.log("Login authorize.");
            },
            fail: function (xhr, status, error) {
                console.log("Login not authorize. Fail");
            },
            error: function (xhr, status, error) {
                console.log("Login not authorize. Error");
            }
        });
    }
}

$(document).on("click", "#submitLogin", function (e) {
    submitLogin(e);
});

$(document).on("click", "#logOut", function (e) {
    logOut(e);
});

$(document).on("click", "#submRegistration", function (e) {
    submRegistration(e);
});

$(document).ready(function () {
    checkAuthorize();
});