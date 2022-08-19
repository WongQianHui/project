"use strict";
const UsersDB = require('../models/UsersDB');
//const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var usersDB = new UsersDB();
var secret = "somesecretkey";

function getAllUsers(request, respond){
    usersDB.getAllUsers(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function addUser(request, respond){
    var username = request.body.username; 
    var password = request.body.password; 
    var name = request.body.name;
    var gender =  request.body.gender;
    var email_address =  request.body.email_address;
    //encrypt password
    password = bcrypt.hashSync(password,10);
    usersDB.addUser(username,password,name,gender,email_address, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function updateUser(request, respond){
    var userid = request.params.id;
    var username = request.body.username;
    var password = request.body.password;
    var name = request.body.name;
    var gender = request.body.gender;
    var email_address =  request.body.email_address;
    var token = request.body.token;
    password = bcrypt.hashSync(password,10);
    try {
        var decoded = jwt.verify(token,secret);
        usersDB.updateUser(userid,username,password,name,gender,email_address, function(error, result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result);
            }
        });
    } catch (error) {
        respond.json({result:"invalid token"});
    }
}
//what is expected when logging in
function loginUser(request, respond){
    var username = request.body.username; 
    var password = request.body.password; 
    usersDB.loginUser(username, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            if(result.length > 0){
            const hash = result[0].password;
            //compare the encrypted password with the clear text
            //flag will be true if same, flag will be false if not same
            var flag = bcrypt.compareSync(password,hash);
            if (flag){
                //know which token belongs to which user 
                var token = jwt.sign(username,secret);
                respond.json({result:token,currentid:result[0]._id});
            }else{
                respond.json({result:false});
            }
        }}
    });
}

function deleteUser(request,respond){
    var _id = request.params.id;
    usersDB.deleteUser(_id,function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}
module.exports = {getAllUsers, addUser, updateUser,loginUser,deleteUser};