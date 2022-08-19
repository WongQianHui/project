"use strict";
const CategoryDB = require('../models/CategoriesDB');

var categoriesDB = new CategoryDB();

function getAllCategories(request, respond){
    categoriesDB.getAllCategories(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

module.exports = {getAllCategories};