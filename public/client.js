
const serverBase = window.location.href.split('#')[0];
const SMOOTHIES_URL = serverBase + 'smoothies';
let myStorage = window.localStorage;
let recipeId;

function viewAllSmoothies() {
  $('body').on('click', '.view-all-cta, .nav-community', () => {
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
        element.find('.smoothieName').text(recipe.title);
        element.find('.ingredientsList').html(ingredients);
        return element
      });
      $('.smoothies').html(recipeElement);
    }).fail(err => console.log(err));
  });
}

function viewMySmoothies() {
  $('body').on('click', '.save-cta, .nav-my-smoothies', () => {
    $('.activities').html('<div class="smoothies"></div>');
    $.ajax({
      url: `${SMOOTHIES_URL}/${localStorage.getItem('userId')}`,
      type: 'GET',
      headers: {
        authorization: myStorage.tokenKey
      }
    }).done(recipes => {
      let recipeVals = {
        recipes: recipes
      };
      let recipeElement = recipeVals.recipes.map((recipe) => {
        let element = $(smoothieTemplate);
        let ingredients = recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`);
        element.find('.smoothieName').text(recipe.title);
        element.find('.ingredientsList').html(ingredients);
        element.find('.delete').attr('value', recipe._id);
        element.find('.update').attr('value', recipe._id);
        return element
      });
      $('.smoothies').html(recipeElement);
    }).fail(err => console.log(err));
  });
}

function addMoreIngredientFields() {
  $('.activities').on('click', '.addmore', (event) => {
    event.preventDefault();
    $('.ingredients').append(`<div class="ingredient">
      <input type="number" step="any" name="quantity" placeholder="amount">
      <div class="measurementwrapper">
      <select name="measurements">
      <option value="" disabled selected>Select measurement</option>
      <option value="cup">cup</option>
      <option value="tablespoon">tablespoon</option>
      <option value="teaspoon">teaspoon</option>
      <option value="fluid oz.">fluid oz.</option>
      <option value="full amount of">full amount of</option>
      </select>
      <div class="arrowcontainer">
      <i class="fas fa-angle-down"></i>
      </div>
      </div>
      <input type="text" name="ingredient" placeholder="ingredient">
      </div>`);
  });
}

function addNewRecipe() {
  let amountOfIngredients;
  $('body').on('click', '.create-cta, .nav-create', () => {
    $('.activities').html(createSmoothieTemplate);
  });
  $('.activities').on('submit', '#createSmoothie', (event) => {
    event.preventDefault();
    let amountOfingredientDivs = $('.ingredients > div').length;
    let amountInput;
    let measurementSelect;
    let ingredientInput;
    for (let i = 1; i <= amountOfingredientDivs; i++) {
      amountInput = $(`.ingredients > div:nth-child(${i}) > [name=quantity]`).val();
      measurementSelect = $(`div:nth-child(${i}) > .measurementwrapper > [name=measurements]`).val();
      ingredientInput = $(`.ingredients > div:nth-child(${i}) > [name=ingredient]`).val();
    }
    if (amountInput === "") {
      $('.warning').show();
      $('.warning').text('Amount field must be filled out')
    } else if (measurementSelect === null) {
      $('.warning').show();
      $('.warning').text('Measurement needs to be selected');
    } else if (ingredientInput === "") {
      $('.warning').show();
      $('.warning').text('Ingredients need to filled out');
    } else {
      amountOfIngredients = $('.ingredients > div').length;
      let ingredients;
      let ingredientsArray = [];
      let arrayOfIngredients;
      for (i = 0; i < amountOfIngredients; i++) {
        if (amountOfIngredients > 0) {
          let serializedArray = $(`.ingredients > div:nth-child(${i+1}) :input`).serializeArray();
          ingredients = serializedArray.map(value => value['value']);
          ingredientsArray.push(ingredients);
        }
        let ingredientsArrayOfArrays = ingredientsArray.map(ingredients => ingredients.join(' '));
        arrayOfIngredients = ingredientsArrayOfArrays.map(ingredient => ingredient);
      }
      let recipeDetails = {
        title: $('[name=smoothieName]').val().trim(),
        ingredients: arrayOfIngredients,
        userId: myStorage.userId
      };
      $.ajax({
        url: SMOOTHIES_URL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(recipeDetails),
        headers: {
          authorization: myStorage.tokenKey
        }
      }).done((recipe) => {
        $('.activities').html('<div class="smoothies"></div>');
        displayCurrentRecipes();
        $('.nav-my-smoothies').toggleClass('active');
        $('.nav-create').toggleClass('active');
      }).fail((err) => {
        $('.warning').show();
        $('.warning').text(err.responseJSON);
      });
    }
  });
}

function displayCurrentRecipes() {
  $('.activities').html('<div class="smoothies"></div>');
  $.ajax({
    url: `${SMOOTHIES_URL}/${localStorage.getItem('userId')}`,
    type: 'GET',
    headers: {
      authorization: myStorage.tokenKey
    }
  }).done(recipes => {
    let recipeVals = {
      recipes: recipes
    };
    let recipeElement = recipeVals.recipes.map((recipe) => {
      let element = $(smoothieTemplate);
      let ingredients = recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`);
      element.find('.smoothieName').text(recipe.title);
      element.find('.ingredientsList').html(ingredients);
      element.find('.delete').attr('value', recipe._id);
      element.find('.update').attr('value', recipe._id);
      return element
    });
    $('.smoothies').html(recipeElement);
  }).fail(err => console.log(err));
}

function deleteRecipe() {
  $('.activities').on('click', '.delete', (el) => {
    $('.deleteWarningWrapper').show();
    $('.deleteWarningWrapper').html(deleteWarningTemplate);
    $('.deleteWarningWrapper').on('click', '.proceed', (event) => {
      let recipeToRemove = $(this).parent('.smoothie');
      recipeId = el.currentTarget.getAttribute('value');
      $.ajax({
        url: `${SMOOTHIES_URL}/${recipeId}`,
        type: 'DELETE',
        headers: {
          authorization: localStorage.getItem('tokenKey')
        }
      }).done((recipe) => {
        recipeToRemove.remove();
        displayCurrentRecipes();
        $('.deleteWarningWrapper').hide();
      }).fail((err) => {
        console.log(err);
      });
    });
    $('.deleteWarningWrapper').on('click', '.cancel', () => {
      $('.deleteWarningWrapper').hide();
    });
  });
}

function updateRecipe() {
  let amountOfIngredients;
  $('.activities').on('click', '.update', (el) => {
    $('.activities').html(editSmoothieTemplate);
    let recipeToBeUpdated = $(this).parents('.smoothie');
    recipeId = el.currentTarget.getAttribute('value');
    $.ajax({
      url: `${SMOOTHIES_URL}/update/${recipeId}`,
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('tokenKey')
      }
    }).done((recipes) => {
      let newString = recipes.ingredients.join('\n');
      $('#editSmoothie input').val(recipes.title);
      $('#editSmoothie textarea').text(newString);
    }).fail(err => console.log(err));
  });
  $('.activities').on('submit', '#editSmoothie', (event) => {
    event.preventDefault();
    let ingredientStrings = $('#editSmoothie textarea').val().split(/\n/);
    let updatedIngredients = [];
    for (let i = 0; i < updatedIngredients.length; i ++) {
      updatedIngredients.push(updatedIngredients[i]);
      return updatedIngredients;
    }
    let updateInfo = {
      title: $('[name=smoothieName]').val().trim(),
      ingredients: ingredientStrings,
      id: recipeId
    };
    $.ajax({
      url: `${SMOOTHIES_URL}/${recipeId}`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(updateInfo),
      headers: {
        authorization: localStorage.getItem('tokenKey')
      }
    }).done(() => {
      $('.activities').html('<div class="smoothies"></div>');
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
