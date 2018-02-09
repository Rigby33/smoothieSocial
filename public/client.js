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

const allSmoothiesTemplate = (
  `<div class="smoothie js-smoothie">
  <h3 class="js-recipe-title"></h3>
  <ul class="js-recipe-ingredients"></ul>
  <button class="add">Add to my smoothies</button>
  </div>`
);

const serverBase = 'http://localhost:8080/';
const SMOOTHIES_URL = serverBase + 'smoothies';
let myStorage = window.localStorage;


let recipeId;

function viewAllSmoothies() {
  $('.viewallsmoothies').on('click', () => {
    $.ajax({
      url: SMOOTHIES_URL,
      type: 'GET',
      headers: {
        authorization: myStorage.tokenKey
      }
    }).done(recipes => {
      let recipeVals = {
        recipes: recipes
      };
      let recipeElement = recipeVals.recipes.map((recipe) => {
        let element = $(allSmoothiesTemplate);
        let ingredients = recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`);
        element.find('.js-recipe-title').text(recipe.title);
        element.find('.js-recipe-ingredients').html(ingredients);
        element.find('.add').attr('value', recipe._id);
        return element
      });
      console.log(recipeVals);
      console.log(recipeElement);
      $('#js-smoothies').html(recipeElement);
      }).fail(err => console.log(err));
  });
}

// function addToCollection() {
//   $('#js-smoothies').on('click', () => {
//     let title = $(this).parent('.smoothie').html();
//     console.log(title);
//   });
// }

function viewMySmoothies() {
  $('.viewSmoothies').on('click', () => {
    $.ajax({
      url: `${SMOOTHIES_URL}/${localStorage.getItem('userId')}`,
      type: 'GET',
      headers: {
        authorization: myStorage.tokenKey
      }
  }).done(recipes => {
    if(!(recipes > 0)) {
      console.log('you need to create recipes first');
    }
    let recipeVals = {
      recipes: recipes
    };
    let recipeElement = recipeVals.recipes.map((recipe) => {
      let element = $(smoothieTemplate);
      let ingredients = recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`);
      element.find('.js-recipe-title').text(recipe.title);
      element.find('.js-recipe-ingredients').html(ingredients);
      element.find('.delete').attr('value', recipe._id);
      element.find('.update').attr('value', recipe._id);
      return element
    });
    console.log(recipeVals);
    console.log(recipeElement);
    $('#js-smoothies').html(recipeElement);
    }).fail(err => console.log(err));
});
}

function addNewRecipe() {
  $('.create').on('click', () => {
    $('#js-smoothies').empty();
    console.log('hi');
    $.ajax({
      url: `${SMOOTHIES_URL}/${localStorage.getItem('userId')}`,
      type: 'GET',
      headers: {
        authorization: myStorage.tokenKey
      }
  }).done(recipes => {
    if(!(recipes > 0)) {
      console.log('you need to create recipes first');
    }
    let recipeVals = {
      recipes: recipes
    };
    let recipeElement = recipeVals.recipes.map((recipe) => {
      let element = $(smoothieTemplate);
      let ingredients = recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`);
      element.find('.js-recipe-title').text(recipe.title);
      element.find('.js-recipe-ingredients').html(ingredients);
      element.find('.delete').attr('value', recipe._id);
      element.find('.update').attr('value', recipe._id);
      return element
    });
    console.log(recipeVals);
    console.log(recipeElement);
    }).fail(err => console.log(err));
    $('#smoothieForm').html(createSmoothieTemplate);
  });
  $('#smoothieForm').on('submit', '#createSmoothie', (event) => {
    event.preventDefault();
    let serializedArray = $('[name=ingredients]').serializeArray();
    console.log(serializedArray);
    let ingredientsArray = [];
    let ingredients = serializedArray.map(value => value['value']);
    let recipeDetails = {
      title: $('[name=smoothieName]').val().trim(),
      ingredients: ingredients,
      userId: myStorage.userId
    };
    console.log(recipeDetails);
    console.log(myStorage.tokenKey);
    $.ajax({
      url: SMOOTHIES_URL,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(recipeDetails),
      headers: {
        authorization: myStorage.tokenKey
      }
    }).done((recipe) => {
      // getAndDisplayRecipes();
      displayCurrentRecipes();
    }).fail((err) => {
      console.log(err);
    });
  });
}
//
// function getAndDisplayRecipes() {
//   console.log('retrieving recipes');
//   $.getJSON(`${SMOOTHIES_URL}/${localStorage.getItem('userId')}`, function(recipes) {
//     console.log('rendering recipes');
//     let recipeElement = recipes.map(function(recipe) {
//       let element = $(smoothieTemplate);
//       let ingredients = recipe.ingredients.map((element) =>`<li>${element}</li>`);
//       element.find('.js-recipe-title').text(recipe.title);
//       element.find('.js-recipe-ingredients').html(ingredients);
//       return element
//     });
//     $('.js-smoothies').html(recipeElement)
//   });
// }

function displayCurrentRecipes() {
  $.ajax({
    url: `${SMOOTHIES_URL}/${localStorage.getItem('userId')}`,
    type: 'GET',
    headers: {
      authorization: localStorage.getItem('tokenKey')
    }
  }).done((recipes) => {
    let recipeVals = {
      recipes: recipes
    };
    let recipeElement = recipeVals.recipes.map((recipe) => {
      let element = $(smoothieTemplate);
      let ingredients = recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`);
      element.find('.js-recipe-title').text(recipe.title);
      element.find('.js-recipe-ingredients').html(ingredients);
      element.find('.delete').attr('value', recipe._id);
      element.find('.update').attr('value', recipe._id);
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
      type: 'DELETE',
      headers: {
        authorization: localStorage.getItem('tokenKey')
      }
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
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('tokenKey')
      }
    }).done((recipe) => {
      console.log(recipe);
    })
    // displayRecipeToEdit(recipe);
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
      headers: {
        authorization: localStorage.getItem('tokenKey')
      }
    }).done(() => {
      displayCurrentRecipes();
    });
  });
}


function displayRecipeToEdit(recipe) {
  $('[name=smoothieName]').val(`${recipe.title}`);
  $('[name=ingredients]').val(`${recipe.ingredients}`);
}
// $(addToCollection);
$(viewAllSmoothies);
$(viewMySmoothies);
$(updateRecipe);
$(deleteRecipe);
$(addNewRecipe);
$(displayCurrentRecipes);
