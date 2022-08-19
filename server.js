var express = require("express") //using express framework
const port = 3000
var productController = require("./controllers/productController");
var userController = require("./controllers/userController");
var commentController = require("./controllers/commentController");
var categoryController = require("./controllers/categoryController");
var app = express();

app.use(express.static("./public"));
app.use(express.json());

//create RESAPI route
app.route('/products').get(productController.getAllProducts);
app.route('/products/:product_name').get(productController.searchProduct);

//category
app.route('/categories').get(categoryController.getAllCategories);

//comments
app.route('/comments').get(commentController.getAllComments)
app.route('/comments').post(commentController.addComment);
app.route('/comments/:id').put(commentController.updateComment);
app.route('/comments/:id').delete(commentController.deleteComment);

//users
app.route('/users').get(userController.getAllUsers)
app.route('/users/:id').put(userController.updateUser);
app.route('/users').post(userController.addUser);
app.route('/users/:id').delete(userController.deleteUser);
app.route('/login').post(userController.loginUser);
//params refer to value of id here
//get=retrive post=insert put=update
//when routing path is the same, the ; only appears at the end
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
//app.listen(8080,"127.0.0.1");
//console.log("web server running @ http://127.0.0.1:8080")
