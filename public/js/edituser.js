function getUsersData() {
	var request = new XMLHttpRequest();
	request.open('GET', user_url, true);
	//This function will be called when data returns from the web api
	request.onload = function() {
	//get all the movies records into our movie array
	user_array = JSON.parse(request.responseText);
	console.log(user_array)
};
request.send();}

// fetch("/users")
//     .then(response => response.json())
//     .then(data => userData(data))
//     .then(error => console.log(error))

// function userData(data){
//     var user = document.getElementById("users");
//     for (var a = 0; a < data.length; a++){
//         var b = document.createElement("b");
//         b.innerHTML = data[a].username
//         b.classList.add("user");
//         b.setAttribute("_id",data[a]._id);
//         console.log(b);
//     }
// }

function getSpecificUser() {
	var request = new XMLHttpRequest();
	request.open('GET', user_url, true);
	//This function will be called when data returns from the web api
	request.onload = function() {
	//get all the movies records into our movie array
	user_array = JSON.parse(request.responseText);
    //var username = sessionStorage.getItem("username");
    var _id = sessionStorage.getItem("currentid");
    var get_current_user = []
	console.log(user_array)
    //look through all the users
    for(var i = 0; i < user_array.length; i++){
        //if the logged in user matches with 1 of the users
        if (user_array[i]._id == _id){
            console.log(user_array[i].username)
            get_current_user.push(user_array[i])
            sessionStorage.setItem("_id",user_array[i]._id)
            document.getElementById("inputusername").value = user_array[i].username;
            document.getElementById("inputpassword").value = user_array[i].password;
            document.getElementById("inputname").value = user_array[i].name;
            document.getElementById("inputgender").value = user_array[i].gender;
            document.getElementById("inputemail_address").value = user_array[i].email_address;
            break;
        }
    }
};
request.send();}


function updateUser() {
    var updateUser = new XMLHttpRequest();
    var updateuser_url = user_url + "/" + sessionStorage.getItem("_id");
    updateUser.open("PUT",updateuser_url,true);
    updateUser.setRequestHeader("Content-type","application/json");
    var username = document.getElementById("inputusername").value;
    var password = document.getElementById("inputpassword").value;
    var name = document.getElementById("inputname").value;
    var gender = document.getElementById("inputgender").value;
    var email_address = document.getElementById("inputemail_address").value;
    var token = sessionStorage.getItem("token")
            
    var payload = {username:username,password:password,name:name,gender:gender,email_address:email_address,token:token}
    updateUser.send(JSON.stringify(payload))
}

function deleteUser() {
    var response = confirm("Are you sure you want to delete this user?");
    if (response == true) {
        var deletecurrentuser = new XMLHttpRequest();
        var deleteUser_url = user_url + "/" + sessionStorage.getItem("_id");
        deletecurrentuser.open("DELETE", deleteUser_url, true);
        deletecurrentuser.setRequestHeader("Content-type", "application/json");
        // deletecurrentuser.onload = function () {
        //     //redirect the user back into main page after they delete
        window.location.href="index.html"
             sessionStorage.clear();
        //         $('#registerMenu').show();
        //         $('#loginMenu').show();
        //         $('#logoutMenu').hide();
        // }
        deletecurrentuser.send();
    }
}