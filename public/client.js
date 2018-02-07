const createSmoothieTemplate = (
  `<form id="createSmoothie">
    <label for="smoothieName">Smoothie Name</label>
    <input name="smoothieName" type="text">
    <div class="ingredients">
      <label for="ingredients">Ingredients</label>
      <input type="text" name="ingredients">
      <input type="text" name="ingredients">
      <input type="text" name="ingredients">
    </div>
    <button type="submit">Blend</button>
  </form>`
);

const editSmoothieTemplate = (
  `<form id="editSmoothie">
    <label for="smoothieName">Smoothie Name</label>
    <input name="smoothieName" type="text">
    <div class="ingredients">
      <label for="ingredients">Ingredients</label>
      <input type="text" name="ingredients">
      <input type="text" name="ingredients">
      <input type="text" name="ingredients">
    </div>
    <button type="submit">Blend</button>
  </form>`
)

const smoothieTemplate = (
  `<div class="smoothie js-smoothie">
  <h3 class="js-recipe-title"></h3>
  <ul class="js-recipe-ingredients"></ul>
  <button class="delete">Delete</button>
  <button class="update">Update</button>
  <div class="editForm"></div>
  </div>`
);

const serverBase = 'http://localhost:8080/';
const SMOOTHIES_URL = serverBase + 'smoothies';

let recipeId;

function addNewRecipe() {
  $('.create').on('click', () => {
    $('#smoothieForm').html(createSmoothieTemplate);
  })
  $('#smoothieForm').on('submit', '#createSmoothie', (event) => {
    event.preventDefault();
    let serializedArray = $('[name=ingredients]').serializeArray();
    console.log(serializedArray);
    let ingredientsArray = [];
    let ingredients = serializedArray.map(value => value['value']);
    console.log(ingredients);
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
      element.find('.delete').attr('value', recipe.id);
      element.find('.update').attr('value', recipe.id);
      return element
    });
    console.log(recipeVals);
    console.log(recipeElement);
    $('#js-smoothies').html(recipeElement);
  });
}

function deleteRecipe() {
  $('#js-smoothies').on('click', '.delete', (el) => {
    let recipeToRemove = $(this).parent('.smoothie');
    recipeId = el.currentTarget.getAttribute('value');
    console.log(recipeId);
    $.ajax({
      url: `${SMOOTHIES_URL}/${recipeId}`,
      type: 'DELETE'
    }).done((recipe) => {
      recipeToRemove.remove();
      displayCurrentRecipes();
    }).fail((err) => {
      console.log(err);
    });
  });
}

function updateRecipe() {
  $('#js-smoothies').on('click', '.update', (el) => {
    $('#smoothieForm').html(editSmoothieTemplate);
    let recipeToBeUpdated = $(this).parents('.smoothie');
    recipeId = el.currentTarget.getAttribute('value');
    console.log(recipeId);
    $.ajax({
      url: `${SMOOTHIES_URL}/${recipeId}`,
      type: 'GET'
    }).done((recipe) => {
      displayRecipeToEdit(recipe);
    }).fail((err) => {
      console.log(err);
    });
  });
  $('#smoothieForm').on('submit', '#editSmoothie', (event) => {
    event.preventDefault();
    let updatedTitle = $('[name=smoothieName]').val().trim();
    let serializedArray = $('[name=ingredients]').serializeArray();
    let updatedIngredients = serializedArray.map(value => value['value']);
    console.log(updatedIngredients);
    let updatedInfo = {
      title: updatedTitle,
      ingredients: updatedIngredients,
      id: recipeId
    }
    $.ajax({
      url: `${SMOOTHIES_URL}/${recipeId}`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(updatedInfo),
    }).done(() => {
      displayCurrentRecipes();
    });
  });
}


function displayRecipeToEdit(recipe) {
  $('[name=smoothieName]').val(`${recipe.title}`);
}

$(updateRecipe);
$(deleteRecipe);
$(addNewRecipe);
$(displayCurrentRecipes);
