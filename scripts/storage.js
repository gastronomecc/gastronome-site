$(document).ready(function() {
    retrieveData();
    // console.log(recipes);
    // displayAllRecipes();
});
      
// All recipes and their information
var recipesArray = [
    {
        name: "Avocado & Kale Omelet",
        description:
            "Move over, avocado toast. Top a high-protein omelet with avocado and fiber-rich kale and you'll keep hunger at bay for longer.",
        image: "assets/images/food/Avocado&KaleOmelet.jpg",
    },
    {
        name: "Chicken with Bell Pepper & Hominy",
        description:
            "Hominy is made by soaking dried corn kernels in lime to remove the tough hull and germ. The result looks like puffed-up corn, perhaps most notably enjoyed in the Mexican soup posole. In this healthy chicken stir-fry recipe, the hominy is added along with the vegetables to make a hearty dinner.",
            image: "assets/images/food/ChickenBellPepperStirFry.jpg",
    },
    {
        name: "Egg-in-a-Hole with Spinach & Bacon",
        description:
            "When you make this cute breakfast-for-dinner recipe, also known as toad-in-a-hole or a one-eyed jack, you can vary it by using kale or even Swiss chard in place of the spinach.",
            image: "assets/images/food/Egg-in-a-Hole.jpg",
    },
    {
        name: "Buttermilk Oatcakes",
        description:
            "These high-fiber oatcakes are made with 100% whole grains and no butter. A quick raspberry compote is a nice change from maple syrup.",
            image: "assets/images/food/ButtermilkOatcakesWithRaspberryCompote.jpg",
    },
    {
        name: "Chicken & Spinach Soup",
        description:
            "This fragrant, Italian-flavored soup takes advantage of quick-cooking ingredients—boneless, skinless chicken breast, bagged baby spinach and canned beans. It features a simple homemade basil pesto swirled in at the end to add a fresh herb flavor.",
            image: "assets/images/food/ChickenSpinachSoup.jpg",
    },
    {
        name: "Spinach & Dill Pasta Salad",
        description:
            "Edamame gives this veggie-packed vegan pasta salad a bit of feel-full protein. Serve topped with extra freshly ground pepper, if desired.",
            image: "assets/images/food/Spinach&DillPastaSalad.jpg",
    }
];
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
        displayAllRecipes(recipes);
    });
}


// Display all recipes
function displayAllRecipes(recipes) {
    console.log(recipes.length);
    for (var i = 0; i < recipes.length; i++) {
        var contentDiv = document.createElement("div");
        contentDiv.setAttribute("class", "content--recipe");

        // Create a div containing the module name
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