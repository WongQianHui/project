function getCategoriesData() {    //index.html
    var request = new XMLHttpRequest();
    request.open('GET', categories_url, true); //app.js
    //This function will be called when data returns from the web api
    request.onload = function () {
        //get all the movies records into our movie array
        categories_array = JSON.parse(request.responseText); //app.js
        console.log(categories_array) //app.js
    };
    //This command starts the calling of the movies web api and end the function   
    request.send();
}

