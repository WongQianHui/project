function loginMe(){
    var loginUser = new XMLHttpRequest();
    loginUser.open("POST","/login",true);
    loginUser.setRequestHeader("Content-Type","application/json");
    loginUser.onload=function(){
        //when registration is successful, hide the register & give feedback to show success
        $('#loginModal').modal('hide');
        //convert token to json object
        var token = JSON.parse(loginUser.responseText);
        console.log(token.result);
        if (token.result != false) {
            $('#successModal').modal('show');
            document.getElementById("welcome").innerHTML = "Welcome, " + username
            document.getElementById("welcomemessage").innerHTML = "Welcome, " + username
            document.getElementById("registerMenu").style.display="none";
            document.getElementById("loginMenu").style.display="none";
            document.getElementById("logoutMenu").style.display="block";
            document.getElementById("editMenu").style.display="block";
            sessionStorage.setItem("token",token.result);
            sessionStorage.setItem("username",username);
            sessionStorage.setItem("currentid",token.currentid);
            //console.log(sessionStorage.setItem("currentid",token._id))
        } else {
            $('#failModal').modal('show');
        }
    }
    var username = document.getElementById("usernameLogin").value;
    var password = document.getElementById("passwordLogin").value;

    //according to adduser at the usercontroller
    var payload = {username:username,password:password,name:name,gender:gender,email_address:email_address}
    loginUser.send(JSON.stringify(payload))

}