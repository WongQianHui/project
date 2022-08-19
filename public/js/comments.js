function fetchComments() {
    var request = new XMLHttpRequest();
    request.open('GET', comment_url, true);
    //This command starts the calling of the comments api, get everything from comment table
    request.onload = function () {
        //get all the comments records into our comments array
        comment_array = JSON.parse(request.responseText);
        console.log(comment_array);
    };
    request.send();
}
//This function is to display all the comments of that movie
//whenever the user click on the "comment" button
function showProductComments(element) {
    document.getElementById("emptyComment").innerHTML = "No review yet. Create one now";
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("review").textContent = "Review for " + product_array[item].product_name;
    document.getElementById("commentBody").textContent = "";
    //check movie title is equal, then display the relevant comments
    for (var i = 0; i < comment_array.length; i++) {
        if (comment_array[i].product_id == product_array[item]._id) {
            document.getElementById("emptyComment").innerHTML = "";
            selectedProductId = product_array[item]._id;
            star = "";
            var html = '<div class="text-center" style="width:100%;">                                                           \
                            <div class="card">                                                                                  \
                                <div class="card-body">                                                                         \
                                    <p class="card-text" id="rating' + i + '">' + comment_array[i].content + "</p>               \
                                    <small>by " + comment_array[i].username + " @ " + comment_array[i].date + "</small>   \
                                </div>                                                                                          \
                            </div>                                                                                              \
                        </div>";
            document.getElementById("commentBody").insertAdjacentHTML('beforeend', html);

            var star = "";
            for (var j = 0; j < comment_array[i].rating; j++) {
                console.log(i);
                star += "<img src='images/star.png' style='width:50px' />";
            }
            star += "<i class='far fa-trash-alt fa-2x edit' data-dismiss='modal' item='" + i + "' onClick='deleteComment(this)' ></i>";
            //the editcomment function is from the onclick
            star += "<i class='far fa-edit fa-2x edit' data-toggle='modal' data-target='#editCommentModal' data-dismiss='modal' item='" + i + "' onClick='editComment(this)' ></i>";
            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");
        }
    }
}
//resets everything to default value everytime click new comments
function newComment() {
    //Initialise each HTML input elements in the modal window with default value.
    rating = 0;
    document.getElementById("userComments").value = "";
}
// Submit or send the new comment to the server to be added.
function addComment() {
    var token = sessionStorage.getItem("token")
    if (token != null) {
        var comment = new Object();
        var currentuser_id = sessionStorage.getItem("currentid");
        var currentusername = sessionStorage.getItem("username");
        comment.product_id = product_array[currentIndex]._id; // Movie ID is required by server to create new comment 
        comment.user_id = currentuser_id;
        comment.username = currentusername;
        comment.content = document.getElementById("userComments").value; // Value from HTML input text
        comment.date = null; // Change the datePosted to null instead of taking the timestamp on the client side;
        comment.rating = rating;

        var postComment = new XMLHttpRequest(); // new HttpRequest instance to send comment

        postComment.open("POST", comment_url, true); //Use the HTTP POST method to send data to server

        postComment.setRequestHeader("Content-Type", "application/json");
        postComment.onload = function () {
            console.log("new comment sent");
            fetchComments(); // fetch all comments again so that the web page can have updated comments.     
        };
        // Convert the data in Comment object to JSON format before sending to the server.
        postComment.send(JSON.stringify(comment));
    }
    else {
        var response = confirm("Please login in!");
    }
}
//This function allows the user to mouse hover the black and white popcorn
//so that it will turn to a colored version when hovered
//triggered when mouse over
function rateIt(element) {
    //get the 1-5stars
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var stars = document.getElementsByClassName(classname);
    var classTarget = "." + classname;

    // This is another way of writing 'for' loop, which initialises the 
    // popcorn images use black and white.
    for (let star of stars) {
        star.setAttribute("src", uncolouredstarImage);
    }
    //change black & white popcorn to coloured based on the value of rating
    changeStarImage(num, classTarget);
}
// This function sets the rating and coloured images based on the value of the image tag when  
// the mouse cursor hovers over the popcorn image.
function changeStarImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            rating = 4;
            break;
        case 5:
            //if mouse over that amount, these amount of popcorns will change colour
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", starImage);
            rating = 5;
            break;
    }

}
//This function will hide the existing modal and present a modal with the selected comment
//so that the user can attempt to change the username, rating or movie review
//it is use just to retrive the comments and display it
function editComment(element) {
    var item = element.getAttribute("item");
    //when its triggered, it will save the comment that its been clicked on and the item number
    currentIndex = item;
    //retrive the username, review, and rating from the array into the html file
    //document.getElementById("editid").value = comment_array[item].user_id;
    document.getElementById("edituserComments").value = comment_array[item].content;
    console.log(comment_array[item].rating);
    displayColorStar('editpop', comment_array[item].rating);
}
//This function displayS the correct number of colored popcorn
//based on the movie rating that is given in the user comment
//called from the editcomment function
function displayColorStar(classname, num) {
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let p of pop) {
        p.setAttribute("src", uncolouredstarImage);
    }
    changeStarImage(num, classTarget);
}
//update the comments when submit button is triggered
//This function sends the Comment data to the server for updating
function updateComment() {
    var token = sessionStorage.getItem("token")
    if (token != null) {
        var userid = sessionStorage.getItem("currentid");
        console.log(comment_array[currentIndex].user_id)
        if (userid == comment_array[currentIndex].user_id) {
            var response = confirm("Are you sure you want to update this comment?");
            //if it's true, then it will run the /comment/id
            if (response == true) {
                var edit_comment_url = comment_url + "/" + comment_array[currentIndex]._id;
                var updateComment = new XMLHttpRequest(); // new HttpRequest instance to send request to server
                //PUT for updating something into the database
                updateComment.open("PUT", edit_comment_url, true); //The HTTP method called 'PUT' is used here as we are updating data
                updateComment.setRequestHeader("Content-Type", "application/json");
                //change username, review, rating
                //getElementId = id of the item
                //comment_array[currentIndex].user_id = document.getElementById("editid").value;
                comment_array[currentIndex].content = document.getElementById("edituserComments").value;
                //rating is captured
                comment_array[currentIndex].rating = rating;
                updateComment.onload = function () {
                    //after updating, it should fetch to retrieve the latest updated comment
                    fetchComments();
                };
                updateComment.send(JSON.stringify(comment_array[currentIndex]));
            }
        }
        else {
            var response = confirm("Wrong user!");
        }
    }
    else {
        var response = confirm("Please login in to update!");
    }
}
//This function deletes the selected comment in a specific movie
//triggered when delete icon is clicked on
function deleteComment(element) {
    var token = sessionStorage.getItem("token")
    if (token != null) {
        var item = element.getAttribute("item");//get the current item
        var userid = sessionStorage.getItem("currentid");
        if (userid == comment_array[item].user_id) {
            var response = confirm("Are you sure you want to delete this comment?");
            if (response == true) {
                //retrieve current index
                //retrieve the path from server.js
                var delete_comment_url = comment_url + "/" + comment_array[item]._id;
                var eraseComment = new XMLHttpRequest();
                //http request is a delete request
                eraseComment.open("DELETE", delete_comment_url, true);
                eraseComment.onload = function () {
                    //fetch the latest updates list from comments
                    fetchComments();
                };
                eraseComment.send();
            }
        }
        else {
            var response = confirm("Wrong user!");
        }
    } else {
        var response = confirm("Please login in to delete!");
    }
}
