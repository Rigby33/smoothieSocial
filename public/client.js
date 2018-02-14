
const serverBase = window.location.href.split('#')[0];
const SMOOTHIES_URL = serverBase + 'smoothies';
let myStorage = window.localStorage;


let recipeId;

function viewAllSmoothies() {
  $('body').on('click', '.view-all-cta, .nav-community', () => {
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

 let classNumber = 0;
function addMoreIngredientFields() {
    classNumber ++;
    $('.ingredients').append(`<div class="ingredient${classNumber + 1}">
            <input type="number" step="any" name="quantity" placeholder="amount">
            <div class="measurementwrapper">
            <select name="measurements">
              <option value="cup">cup</option>
              <option value="tablespoon">tablespoon</option>
              <option value="teaspoon">teaspoon</option>
              <option value="fluid oz.">fluid oz.</option>
              <option value="full amount of">full amount of</option>
          </select>
      </div>
              <input type="text" name="ingredient" placeholder="ingredient">
          </div>`);
}

function addNewRecipe() {
  let amountOfIngredients;
  $('body').on('click', '.create-cta, .nav-create', () => {
    $('body').on('click', '.addmore', (event) => {
      addMoreIngredientFields();
    });
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
      element.find('.js-recipe-title').text(recipe.title);
      element.find('.js-recipe-ingredients').html(ingredients);
      element.find('.delete').attr('value', recipe._id);
      element.find('.update').attr('value', recipe._id);
      return element
    });
    }).fail(err => console.log(err));
    $('.activities').html(createSmoothieTemplate);
  });
  $('.activities').on('submit', '#createSmoothie', (event) => {
    event.preventDefault();
    amountOfIngredients = $('.ingredients > div').length;
    let ingredients;
    let ingredientsArray = [];
    let arrayOfIngredients;
    for (i = 0; i < amountOfIngredients; i++) {
      if (amountOfIngredients > 0) {
      let serializedArray = $(`.ingredient${+ i} :input`).serializeArray();
      ingredients = serializedArray.map(value => value['value']);
      ingredientsArray.push(ingredients);
      }
      let thisnewthing = ingredientsArray.map(ingredients => ingredients.join(' '));
      arrayOfIngredients = thisnewthing.map(ingredient => ingredient);
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
    }).fail((err) => {
      $('.error').html(err.message);
      console.log(err);
    });
  });
}

function removeIngredientFields() {
  $('.activities').on('click', '.removeFields', (event) => {
    event.preventDefault();
    $('[name=ingredients]').remove();
  })
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
    let result = confirm('Are you sure you want to delete this recipe?');
    if(result) {
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
    }).fail((err) => {
      console.log(err);
    });
  }
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

$(viewAllSmoothies);
$(viewMySmoothies);
$(updateRecipe);
$(deleteRecipe);
$(addNewRecipe);
