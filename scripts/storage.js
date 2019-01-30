$(document).ready(function() {
    retrieveData();
});

// All recipes and their information
var recipes = [];

function retrieveData() {
    var ref = firebase.database().ref("Recipes");

    ref.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var value = childSnapshot.val();
            var recipeName = value.title;
            var recipeDesc = value.shortDesc;
            var recipeImage = value.imageURL;

            var object = {name: recipeName, description: recipeDesc, image: recipeImage}
            recipes.push(object);
        });
        displayAllRecipes(recipes)
    });
}

// Display all recipes
function displayAllRecipes(recipes) {
    console.log(recipes.length);
    for (var i = 0; i < recipes.length; i++) {
        var contentDiv = document.createElement("div");
        contentDiv.setAttribute("class", "content--recipe");

        // Create a div containing the recipe name
        var recipeNameDiv = document.createElement("div");

        // Adding the title text
        var node = document.createElement("h2");
        var textnode = document.createTextNode(recipes[i].name);
        node.appendChild(textnode);
        node.setAttribute("class", "recipe--name");

        // Append the title text to recipeNameDiv
        recipeNameDiv.appendChild(node);
        recipeNameDiv.setAttribute("class", "recipe--name--div");

        // Adding a recipe image
        var img1 = new Image();
        img1.src = recipes[i].image;
        img1.setAttribute("class", "recipe--img");

        var recipeTextDiv = document.createElement("div");
        recipeTextDiv.setAttribute("class", "recipe--text--div");

        // Adding the description text
        var node2 = document.createElement("p");
        var textnode2 = document.createTextNode(recipes[i].description);
        node2.appendChild(textnode2);
        node2.setAttribute("class", "recipe--desc");

        var contentDescription = document.createElement("div");
        contentDescription.setAttribute("class", "contentDesc--" + recipes[i].name);

        contentDescription.appendChild(node2);
        contentDescription.setAttribute("class", "recipe--desc--div");

        var img2 = new Image();
        img2.src = "assets/images/food/tags.png";
        img2.setAttribute("class", "recipe--tags");

        contentDiv.appendChild(img1);
        recipeTextDiv.appendChild(recipeNameDiv);
        recipeTextDiv.appendChild(img2);
        recipeTextDiv.appendChild(contentDescription);


        contentDiv.appendChild(recipeTextDiv);

        // ------------ APPEND WHOLE DIV CONTENT ------------
        $("#content--container").append(contentDiv);
    }
}