"use strict";
class User{
    constructor(id, username, password,name, gender, email_address){
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.email_address = email_address;
    }
    getId(){
        return this.id;
    }
    getUsername(){
        return this.username;
    }
    getPassword(){
        return this.password;
    }
    getName(){
        return this.name;
    }
    getGender(){
        return this.gender;
    }
    getEmailAddress(){
        return this.email_address;
    }
    setUsername(username){
        this.username = username;
    }
    setPassword(password){
        this.password = password;
    }
    setName(name){
        this.name = name;
    }
    setGender(gender){
        this.gender = gender;
    }
    setEmailAddress(email_address){
        this.email_address = email_address;
    }
}
module.exports = User;