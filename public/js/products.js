function getProductsData() {    //index.html
    var request = new XMLHttpRequest();
    request.open('GET', product_url, true); //app.js
    //This function will be called when data returns from the web api
    request.onload = function () {
        product_array = JSON.parse(request.responseText); //app.js
        //Fetch the comments as well
        fetchComments(); //comments.js
        console.log(product_array) //app.js
        displayProducts(); //app.js
        getUsersData();

    };
    //This command starts the calling of the movies web api and end the function   
    request.send();

}


//search bar
$(document).ready(function(){
    //for every key
    $("#search").on("keyup", function() {
      //change it to lower case
      var value = $(this).val().toLowerCase();
      // for each product table
      $("#productsTable div").each(function() {
          //toggle each products
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
});

//take value of catgory
function displayProducts() {
    //look for movies table in the html files
    var table = document.getElementById("productsTable"); //index.html
    var productCount = 0;

    table.innerHTML = "";
    //counts the size of the array
    totalProducts = product_array.length;
    //if the availability is now showing, display thumbnail & title of the movie in the table
    for (var count = 0; count < totalProducts; count++) {
        var image = product_array[count].image;
        var product_name = product_array[count].product_name;
        //it is from the function displayMovies, when trigger will show details
        //count=index number of movie in the array, value of count = current index
        var cell = '<div class="card col-4 px-4" ><img class="card-img-top" src="' + image + '" alt="Card image cap">\
                        <div class="card-body"><i class="far fa-comment fa-lg" style="float:left;cursor:pointer" data-toggle="modal" data-target="#commentModal" item="' + count + '" onClick="showProductComments(this)"></i>\
                        <h5 style="padding-left:30px;cursor:pointer" data-toggle="modal" data-target="#productModal" class="card-title" item="' + count + '" onClick="showProductDetails(this)">' + product_name + '</h5></div>\
                </div>'
        table.insertAdjacentHTML('beforeend', cell);
        productCount++;
    }
    message = productCount + " Products " + category;
    //document.getElementById("summary").textContent = message;
    document.getElementById("parent").textContent = "";
}

//if link is active its white
//triggered by top navigation
//This function is to display the "Now Showing" movies

function listProducts() {
    category = "Products";
    displayProducts(category);
    document.getElementById("nowMenu").classList.add("active");
    document.getElementById("comingMenu").classList.remove("active");
    document.getElementById("aboutMenu").classList.remove("active");
}

/*
//This function is to display the "Coming Soon" movies
function listComingMovies() {
    category = "Coming Soon";
    displayMovies(category);
    //activate the comingmenu and deactivate the rest
    document.getElementById("nowMenu").classList.remove("active");
    document.getElementById("comingMenu").classList.add("active");
    document.getElementById("aboutMenu").classList.remove("active");
}
*/

//This function is to display the individual details
//whenever the user clicks on "See More"
//retrieve detail based on the index
function showProductDetails(element) {
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("productTitle").textContent = product_array[item].product_name;
    document.getElementById("image").src = product_array[item].image;
    document.getElementById("information").textContent = product_array[item].information;
}

//This function opens a new window/tab and loads the
//particular movie in the cinema website
/*
function buyTicket() {
    window.open(movie_array[currentIndex].buy, "_blank");
}
*/
function showProducts(categories) {
    //look for movies table in the html files
    var table = document.getElementById("productsTable");
    var productCount = 0;
    table.innerHTML = "";
    //counts the size of the array
    totalProducts = product_array.length;
    //if the availability is now showing, display thumbnail & title of the movie in the table
    for (var count = 0; count < totalProducts; count++) {
        if (product_array[count].type == categories) {
            console.log(product_array[count].type)
            var image = product_array[count].image;
            var product_name = product_array[count].product_name;
            console.log(image)
    //it is from the function displayMovies, when trigger will show details
    //count=index number of movie in the array, value of count = current index
	        var cell = '<div class="card col-4 px-4" ><img class="card-img-top" src="' + image + '" alt="Card image cap">\
                        <div class="card-body"><i class="far fa-comment fa-lg" style="float:left;cursor:pointer" data-toggle="modal" data-target="#commentModal" item="' + count + '" onClick="showProductComments(this)"></i>\
                        <h5 style="padding-left:30px;cursor:pointer" data-toggle="modal" data-target="#productModal" class="card-title" item="' + count + '" onClick="showProductDetails(this)">' + product_name + '</h5></div>\
                </div>'
        table.insertAdjacentHTML('beforeend', cell);
        productCount++;
        }
    }
    document.getElementById("parent").textContent = "";
}


function list_ElectronicDevices() {
    categories = "Electronic Devices";
    showProducts(categories);
}

function list_HomeAppliances() {
    categories = "Home Appliances";
    showProducts(categories);
}

function list_HealthNBeauty() {
    categories = "Health & Beauty";
    showProducts(categories);
}

function list_KitchenWares() {
    categories = "Kitchen Wares";
    showProducts(categories);
}

function list_PetProducts() {
    categories = "Pet Products";
    showProducts(categories);
}
function list_FurnitureNBedding() {
    categories = "Furniture & Bedding";
    showProducts(categories);
}
function list_GardenNPowerTools() {
    categories = "Garden & Power Tools";
    showProducts(categories);
}
function list_BabyNKidsProducts() {
    categories = "Baby & Kids Products";
    showProducts(categories);
}