$(document).ready(function() {
    retrieveData()
});

// All recipes and their information
var recipes = [];

function retrieveData() {
    var pageIndex = -1;

    var ref = firebase.database().ref("Recipes");

    ref.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var value = childSnapshot.val();

            var nutrition = [value.calories, value.carbs, value.protein, value.fats, value.salt, value.sugar];
            pageIndex += 1;

            var object = {
                name: value.title, 
                description: value.shortDesc, 
                image: value.imageURL,
                ingredients: value.ingredients,
                instructions: value.instructions,
                nutrition: nutrition,
                pageIndex: pageIndex
            }
            recipes.push(object);
        });

        var url = location.pathname;
        var filename = url.substring(url.lastIndexOf('/')+1);
    
        if (filename === "recipes.html") {
            displayAllRecipes(recipes);
        }
        else {
            displayRecipeInformation(recipes);
        }
    });
}

// Display all recipes
function displayAllRecipes(recipes) {
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
        recipeTextDiv.setAttribute("class", "recipe--text--div")

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
        img2.src = "assets/images/tags.png";
        img2.setAttribute("class", "recipe--tags");

        contentDiv.appendChild(img1);
        recipeTextDiv.appendChild(recipeNameDiv);
        recipeTextDiv.appendChild(img2);
        recipeTextDiv.appendChild(contentDescription);

        contentDiv.appendChild(recipeTextDiv);

        // ------------ APPEND WHOLE DIV CONTENT ------------
        $("#content--container").append(contentDiv);
    }

    findRecipeIndexClicked(); 
}

var index;

// Find index of clicked recipe
function findRecipeIndexClicked() {
    $(".content--recipe").click(function() {
        index = $(this).index();
        console.log(index);

        window.location.href = "individual-recipe.html?index=" + index;
    });
}


// Render stuff on individual-recipe.html
function displayRecipeInformation(recipes) {
    // GET PARAMETER FOR CURRENT INDEX
    url_string = window.location.href;
    var url = new URL(url_string);
    var currentIndex = url.searchParams.get("index");
    console.log("first Index: " + currentIndex);


    for (var i = 0; i < recipes.length; i++) {
        if (currentIndex == i) {
            var recipeTitle = recipes[i].name;
            var recipeImage = recipes[i].image;
            var recipeDescription = recipes[i].description;
            var recipeIngredients = recipes[i].ingredients;
            var recipeInstructions = recipes[i].instructions;
            var recipeNutrition = recipes[i].nutrition;
            break;

            // ------------------- HOME CONTAINER -------------------
            // var homeDiv = document.createElement("div");
            // homeDiv.setAttribute("class", "home--div");

            // // Adding a recipe image
            // var img1 = new Image();
            // img1.src = recipes[i].image;
            // img1.setAttribute("class", "home--img");

            // // Adding the title text
            // var node1 = document.createElement("h1");
            // var textnode1 = document.createTextNode(recipeTitle);
            // node1.appendChild(textnode1);
            // node1.setAttribute("class", "home--title");

            // homeDiv.appendChild(img1);
            // homeDiv.appendChild(node1);

            // $(".home--container").append(homeDiv);

            // ------------------- INSTRUCTIONS CONTAINER -------------------

        }
    }

    $(".home--title").html(recipeTitle);
    $(".home--image").attr("src", recipeImage);
    console.log(recipeImage);

    $(".home--image").prop("alt", recipeTitle);
    $(".recipe--ingredients").html(recipeIngredients);
    $(".recipe--instructions").html(recipeInstructions);
    $(".recipe--nutrition").html(recipeNutrition);
}