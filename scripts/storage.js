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
            pageIndex += 1;

            var object = {
                // recipe details
                name: value.title, 
                description: value.shortDesc, 
                image: value.imageURL,
                ingredients: value.ingredients,
                instructions: value.instructions,
                // nutrition
                calories: value.calories,
                carbs: value.carbs,
                protein: value.protein,
                fats: value.fats,
                salt: value.salt,
                sugar: value.sugar,

                // page index
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

    for (var i = 0; i < recipes.length; i++) {
        if (currentIndex == i) {
            var recipeTitle = recipes[i].name;
            var recipeImage = recipes[i].image;
            var recipeDescription = recipes[i].description;
            var recipeIngredients = recipes[i].ingredients;
            var recipeInstructions = recipes[i].instructions;
            var calories = recipes[i].calories;
            var carbs = recipes[i].carbs;
            var protein = recipes[i].protein;
            var fats = recipes[i].fats;
            var salt = recipes[i].salt;
            var sugar = recipes[i].sugar;
            break;
        }
    }

    // Recipe Name
    $(".home--title").html(recipeTitle);

    // Recipe Image
    $(".home--image").attr("src", recipeImage);
    $(".home--image").prop("alt", recipeTitle);

    // Recipe Tag
    $(".recipe--tags").attr("src", "assets/images/tags.png");
    $(".recipe--tags").prop("alt", "tags");
    
    // Recipe Description
    $(".recipe--desc").html(recipeDescription);
    
    // Recipe Ingredients
    $(".recipe--ingredients").append(makeUL(recipeIngredients));
    $(".recipe--instructions").append(makeOL(recipeInstructions));

    // Recipe Nutrition
    $(".calories").html(calories);
    $(".carbs").html(carbs);
    $(".proteins").html(protein);
    $(".fats").html(fats)
    $(".sugar").html(sugar);
    $(".salt").html(salt);
}

// making lists
function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for(var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(array[i]));
        list.appendChild(item);
    }

    return list;
}

function makeOL(array) {
    // Create the list element:
    var list = document.createElement('ol');

    for(var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(array[i]));
        list.appendChild(item);
    }

    return list;
}

