const loggedInActivities = (
  `<div class="flexrow">
      <div class="column">
        <h3>View all smoothies made by the community</h3>
        <p>Click the link below to get inspiration from other smoothie creators.</p>
        <button class="communitySmoothies">All Smoothies</button>
      </div>
      <div class="column">
        <h3>Create a Smoothie</h3>
        <p>Are you ready to start saving your smoothie recipes? Click the link below to get started.</p>
        <button class="CreateRecipe">Make a smoothie</button>
      </div>
      <div class="column">
        <h3>Take a look at the smoothies you have made.</h3>
        <p>Click the link below if you want to checkout your creations</p>
        <button class="mySmoothies">My Smoothies</button>
      </div>
    </div>`);

const registrationForm = (
  `<form id="registerForm">
  <label for="username">Username</label>
  <input name="username" type="text">
  <label for="password">Password</label>
  <input name="password" type="password">
  <button type="submit">Register</button>
</form>`);

const loginForm = (
  `<form id="loginForm">
    <label for="username">Username</label>
    <input name="username" type="text">
    <label for="password">Password</label>
    <input name="password" type="password">
    <button type="submit">Register</button>
  </form>`);

const createSmoothieTemplate = (
  `      <div class="smoothieform">
      <form id="createSmoothie">
        <div>
        <label for="smoothieName">Smoothie Name</label>
        <input name="smoothieName" type="text">
      </div>
      <div>
        <label for="ingredients">Ingredients</label>
        <p>Each ingredient must include a number amount for how much of the ingredient should be used to make your recipe. This will help you and other to create the smoothie just like how you intended</p>
        <div class="ingredients">
          <div class="ingredient0">
            <input type="number" name="quantity">
            <select name="measurements">
              <option value="cup">cup</option>
              <option value="tablespoon">tablespoon</option>
              <option value="teaspoon">teaspoon</option>
              <option value="fluid oz.">fluid oz.</option>
              <option value="full amount of">full amount of</option>
              <input type="text" name="ingredient">
          </div>
          <div class="ingredient1">
            <input type="number" name="quantity">
            <select name="measurements">
              <option value="cup">cup</option>
              <option value="tablespoon">tablespoon</option>
              <option value="teaspoon">teaspoon</option>
              <option value="fluid oz.">fluid oz.</option>
              <option value="full amount of">full amount of</option>
              <input type="text" name="ingredient">
          </div>
          <div class="ingredient2">
            <input type="number" name="quantity">
            <select name="measurements">
              <option value="cup">cup</option>
              <option value="tablespoon">tablespoon</option>
              <option value="teaspoon">teaspoon</option>
              <option value="fluid oz.">fluid oz.</option>
              <option value="full amount of">full amount of</option>
              <input type="text" name="ingredient">
          </div>
        </div>
        <div class="suggestions">
        </div>
      </div>
      <div class="formbuttons">
        <button class="addmore">Add more ingredients</button>
        <button type="submit">Blend</button>
      </div>
      </form>
    </div>`
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