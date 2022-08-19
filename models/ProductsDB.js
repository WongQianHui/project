"use strict";

var db = require('../db-connections');
class ProductDB{
    getAllProducts(callback){
        var sql = "SELECT product_review.category.type, product_review.product_list.* FROM product_review.product_list INNER JOIN product_review.category ON product_review.product_list.type_id = product_review.category._id";
        db.query(sql, callback);
    }
    searchProduct(product_name,callback){
        //search for a product using the name
        var sql = "SELECT * FROM product_review.product_list WHERE product_name = ?";
        db.query(sql,[product_name],callback);
    }
}

module.exports = ProductDB;