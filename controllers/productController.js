"use strict";
const ProductDB = require('../models/ProductsDB');

var productsDB = new ProductDB();

function getAllProducts(request, respond){
    productsDB.getAllProducts(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}
function searchProduct(request,respond){
    //get(request for) the product name
    var product_name = request.params.product_name;
    productsDB.searchProduct(product_name,function(error,result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

module.exports = {getAllProducts,searchProduct};