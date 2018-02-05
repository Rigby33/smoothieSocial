const smoothieTemplate = (
  `<div class="smoothie js-smoothie">
  <h3 class="js-recipe-title"></h3>
  <ul class="js-recipe-ingredients"></ul>
  </div>`
);

const serverBase = 'http://localhost:8080/';
const SMOOTHIES_URL = serverBase + 'smoothies';

function addNewRecipe() {
  $('#createSmoothie').on('submit', (event) => {
    event.preventDefault();
    let serializedArray = $('[name=ingredients]').serializeArray();
    let ingredientsArray = [];
    let ingredients = serializedArray.map(value => ingredientsArray.push(value[1]));
    let recipeDetails = {
      title: $('[name=smoothieName]').val().trim(),
      ingredients: ingredients
    };
    console.log(recipeDetails);
    $.ajax({
      url: SMOOTHIES_URL,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(recipeDetails),
    }).done((recipe) => {
      getAndDisplayRecipes();
      displayCurrentRecipes();
    }).fail((err) => {
      console.log(err);
    });
  });
}

function getAndDisplayRecipes() {
  console.log('retrieving recipes');
  $.getJSON(SMOOTHIES_URL, function(recipes) {
    console.log('rendering recipes');
    let recipeElement = recipes.map(function(recipe) {
      let element = $(smoothieTemplate);
      let ingredients = recipe.ingredients.map((element) =>`<li>${element}</li>`);
      element.find('.js-recipe-title').text(recipe.title);
      element.find('.js-recipe-ingredients').html(ingredients);
      return element
    });
    $('.js-smoothies').html(recipeElement)
  });
}

function displayCurrentRecipes() {
  $.ajax({
    url: SMOOTHIES_URL,
    type: 'GET'
  }).done((recipes) => {
    let recipeVals = {
      recipes: recipes
    };
    let recipeElement = recipeVals.recipes.map((recipe) => {
      let element = $(smoothieTemplate);
      let ingredients = recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`);
      element.find('.js-recipe-title').text(recipe.title);
      element.find('.js-recipe-ingredients').html(ingredients);
      return element
    });
    console.log(recipeVals);
    console.log(recipeElement);
    $('#js-smoothies').html(recipeElement);
  });
}

//
// let recipeElement = recipes.map((recipe) => {
//   let element = $(smoothieTemplate);
//   let ingredients = recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`);
//   element.find('.js-recipe-title').html(recipe.title);
//   element.find('.js-recipe-ingredients').html(ingredients);
//   $('#js-smoothies').html(recipeElement);
$(addNewRecipe);
$(displayCurrentRecipes);
