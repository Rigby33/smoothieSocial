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
  `<div class="smoothieform">
      <form id="createSmoothie">
        <div>
        <label for="smoothieName">Smoothie Name</label>
        <input name="smoothieName" type="text">
      </div>
      <div>
        <label for="ingredients">Ingredients</label>
        <div class="ingredients">
          <input type="text" name="ingredients">
          <input type="text" name="ingredients">
          <input type="text" name="ingredients">
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