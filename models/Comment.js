"use strict";
class Comment{
    constructor(id, product_id, user_id, content, date, rating){
        this.id = id;
        this.product_id = product_id;
        this.user_id = user_id;
        this.content = content;
        this.date = date;
        this.rating = rating;
    }
    getId(){
        return this.id;
    }
    getProductId(){
        return this.product_id;
    }
    getUserId(){
        return this.user_id;
    }
    getContent(){
        return this.content;
    }
    getDate(){
        return this.date;
    }
    getRating(){
        return this.rating;
    }
    setProductId(product_id){
        this.product_id = product_id;
    }
    setUserId(user_id){
        this.user_id = user_id;
    }
    setContent(content){
        this.content = content;
    }
    setDate(date){
        this.date = date;
    }
    setRating(rating){
        this.rating = rating;
    }
}
module.exports = Comment;