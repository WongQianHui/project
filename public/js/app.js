//declare afew variables
//triggers the api get product to get all product from the database
var product_url = "/products";
//stores the result into the array
var product_array = []; // This creates an empty product array
//by default its 0, but it will change as the API is runned
var productCount = 0;

var user_url = "/users";
var user_array = [];

var category = "Products";
var currentIndex=0;

var comment_url = "/comments";
//store info from the database
var comment_array = []; // This creates an empty comment array
var uncolouredstarImage = 'images/uncolouredstar.png';
var starImage = 'images/star.png';
//default value of rating
var rating = 0;
