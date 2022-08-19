function registerMe() {
    var registerUser = new XMLHttpRequest();

    totalUsers = user_array.length
    list = [];
    for (var count = 0; count < totalUsers; count++) {
        var Registeredusers = user_array[count].username;
        list.push(Registeredusers)
        //console.log(Registeredusers)
    }
    //console.log(list)
    registerUser.open("POST", "/users", true);
    registerUser.setRequestHeader("Content-Type", "application/json");
    registerUser.onload = function () {
        //when registration is successful, hide the register & give feedback to show success
        $('#registerModal').modal('hide');
        $('#register-success-modal').modal('show');
    }

var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
var name = document.getElementById("name").value;
var gender = document.getElementById("gender").value;
var email_address = document.getElementById("email_address").value;
if (list.includes(username)) {
    console.log("Already Exists");
    $('#register-fail-modal').modal('show');
}
else {
    console.log("Working");
    var payload = { username: username, password: password, name: name, gender: gender, email_address: email_address }
    registerUser.send(JSON.stringify(payload))
}
}