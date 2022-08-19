"use strict";

var db = require('../db-connections');
class UsersDB{
    
   //only get password & username
   getAllUsers(callback){
        //var sql = "SELECT username,password FROM product_review.user"
        var sql = "SELECT * FROM product_review.user"
        db.query(sql, callback);
    }
    //return back record(password) if matches
    loginUser(username,callback){
        var sql = "SELECT password,_id FROM product_review.user WHERE username = ?"
        db.query(sql,[username], callback);
    }
    //want everything
    addUser(username,password,name,gender,email_address,callback){
        var sql = "INSERT INTO user (username, password, name, gender, email_address) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [username,password,name,gender,email_address], callback);
    }

    //don't allow username to be changed
    updateUser(_id, username,password,name,gender,email_address, callback){
        //remove username=? to not allow user to change username
        var sql = "UPDATE user SET password = ?,name = ?,gender = ?, email_address = ?, username = ? WHERE _id = ?";
        console.log(" _id: "+_id,"username: "+ username," password: "+password," name: "+name," gender: "+gender," email_address: "+email_address)
        return db.query(sql, [password,name,gender,email_address,username,_id], callback);
    }
    deleteUser(_id,callback){
        var sql = "DELETE FROM user WHERE _id = ?";
        db.query(sql,[_id], callback);
    }
}
module.exports = UsersDB;