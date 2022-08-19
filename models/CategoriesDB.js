"use strict";

var db = require('../db-connections');
class CategoryDB{
    getAllCategories(callback){
        var sql = "SELECT product_review.product_list.product_name, product_review.category.* FROM product_review.category INNER JOIN product_review.product_list ON product_review.category._id = product_review.product_list._id";

        db.query(sql, callback);
    }
}

module.exports = CategoryDB;