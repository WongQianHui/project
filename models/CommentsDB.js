"use strict";

var db = require('../db-connections');
class CommentsDB{
    getAllComments(callback){
        var sql = "SELECT product_review.user.username, product_review.review.* FROM product_review.review INNER JOIN product_review.user ON product_review.review.user_id = product_review.user._id"
        db.query(sql, callback);
    }
    addComment(comment,callback){
        var sql = "INSERT INTO review (product_id, user_id, content, date, rating) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [comment.getProductId(), comment.getUserId(), comment.getContent(), comment.getDate(), comment.getRating()], callback);
    }
    updateComment(comment, callback){
        //remove username=? to not allow user to change username
        var sql = "UPDATE review SET content = ?, date = ?, rating = ?, user_id = ?, product_id =? WHERE _id = ?";
        db.query(sql, [comment.getContent(), comment.getDate(), comment.getRating(), comment.getUserId(), comment.getProductId(), comment.getId()], callback);
    }
    deleteComment(commentID, callback){
        var sql = "DELETE FROM review WHERE _id = ?";
        db.query(sql, [commentID], callback);
    }
}
module.exports = CommentsDB;