const serverBase = 'http://localhost:8080/';
const SMOOTHIES_URL = serverBase + 'smoothies';
let myStorage = window.localStorage;


let recipeId;

function viewAllSmoothies() {
  $('body').on('click', '.communitySmoothies, .viewallsmoothies', () => {
    showRegularNav();
    $('.activities').html('<div class="smoothies"></div>');
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
      $('.smoothies').html(recipeElement);
      }).fail(err => console.log(err));
  });
}

function viewMySmoothies() {
  $('body').on('click', '.viewSmoothies, .mySmoothies', () => {
    $('.activities').html('<div class="smoothies"></div>');
    showRegularNav();
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
    $('.smoothies').html(recipeElement);
    }).fail(err => console.log(err));
});
}

function addNewRecipe() {
  let amountOfIngredients;
  $('body').on('click', '.create, .CreateRecipe', () => {
    $('#js-smoothies').empty();
    showRegularNav();
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
    $('.activities').html(createSmoothieTemplate);
  });
  $('.activities').on('click', '.addmore', (event) => {
    event.preventDefault();
    amountOfIngredients = $('.ingredients > div').length;
    console.log(amountOfIngredients + 1);
    addMoreIngredientFields();
    return amountOfIngredients;
  })
  $('.activities').on('submit', '#createSmoothie', (event) => {
    event.preventDefault();
    amountOfIngredients = $('.ingredients > div').length;
    console.log(amountOfIngredients);
    let ingredients;
    let ingredientsArray = [];
    for (i = 0; i < amountOfIngredients; i++) {
      if (amountOfIngredients > 0) {
      console.log(i);
      console.log('.ingredients' + i);
      let serializedArray = $(`.ingredient${+ i} :input`).serializeArray();
      console.log(serializedArray);
      ingredients = serializedArray.map(value => value['value']);
      console.log(ingredients);
      ingredientsArray.push(ingredients);
      }
      console.log(ingredientsArray)
    }
    let recipeDetails = {
      title: $('[name=smoothieName]').val().trim(),
      ingredients: ingredientsArray,
      userId: myStorage.userId
    };
    console.log(recipeDetails);
    console.log(JSON.stringify(recipeDetails));
    $.ajax({
      url: SMOOTHIES_URL,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(recipeDetails),
      headers: {
        authorization: myStorage.tokenKey
      }
    }).done((recipe) => {
      displayCurrentRecipes();
    }).fail((err) => {
      console.log(err);
    });
  });
}
 let classNumber = 0;
function addMoreIngredientFields() {
    classNumber ++;
    $('.ingredients').append(`<div class="ingredient${classNumber + 1}">
            <input type="number" name="quantity">
            <select name="measurements">
              <option value="cup">cup</option>
              <option value="tablespoon">tablespoon</option>
              <option value="teaspoon">teaspoon</option>
              <option value="fluid oz.">fluid oz.</option>
              <option value="full amount of">full amount of</option>
              <input type="text" name="ingredient">
          </div>`);
}

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
    $('.activities').html(recipeElement);
  });
}

function deleteRecipe() {
  $('.activities').on('click', '.delete', (el) => {
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
  $('.activities').on('click', '.update', (el) => {
    $('.activities').html(createSmoothieTemplate);
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
  });
  $('.activities').on('submit', '#editSmoothie', (event) => {
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

function showRegularNav() {
  $('.viewallsmoothies').show();
  $('.create').show();
  $('.viewSmoothies').show();
}

function displayRecipeToEdit(recipe) {
  $('[name=smoothieName]').val(`${recipe.title}`);
  $('[name=ingredients]').val(`${recipe.ingredients}`);
}

$(addMoreIngredientFields);
$(viewAllSmoothies);
$(viewMySmoothies);
$(updateRecipe);
$(deleteRecipe);
$(addNewRecipe);