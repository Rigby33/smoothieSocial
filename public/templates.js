const headerTemplate = (
  `<div class="headercontent">
  <img src="img/logo.svg" alt="smoothie social"/>
         <nav>
            <ul>
               <li><a class="nav-create">create</a></li>
               <li><a class="nav-community">community</a></li>
               <li><a class="nav-my-smoothies">my smoothies</a></li>
            </ul>
            <button class="logout">logout</button>
         </nav>
         </div>`)

const loggedInActivities = (
  ` <div class="activitiesWrapper">
  <div class="column">
    <img src="img/community-icon.png" alt="community icon"/>
    <h2>Community</h2>
    <p>Users can view smoothies created by other smoothie social members. You might just get some inspiration for your next creation!</p>
    <button class="view-all-cta">view member creations</button>
  </div>
  <div class="column">
    <img src="img/blender-icon.png" alt="blender icon"/>
    <h2>Create</h2>
    <p>Create smoothie recipes with the easy to use form. You just need a name for your smoothie and the ingredients and you’re on your way!</p>
    <button class="create-cta">make a smoothie</button>
  </div>
  <div class="column">
    <img src="img/save-icon.png" alt="save icon"/>
    <h2>Save</h2>
    <p>After you create your new recipe it is automatically saved for you. You can view, edit, or delete your creations at any time.</p>
    <button class="save-cta">view your creations</button>
  </div>
  </div>`)

const registrationForm =(
  `<div class="userForm">
    <div class="closebutton">
      <div><i class="fas fa-times-circle fa-2x"></i></div>
    </div>
    <h3>REGISTER AS A NEW USER</h3>
    <div class="userquestion"><p>Already a member?</p><button class="loginQuestion">login</button>
    </div>
    <div class="warning"></div>
    <form class="registrationForm">
      <div class="firstlastnames">
        <input type="text" name="firstName" placeholder="first name">
        <input type="text" name="lastName" placeholder="last name">
      </div>
      <input type="text" name="username" placeholder="username">
      <input type="password" name="password" placeholder="password">
      <input type="password" name="confirmpass" placeholder="confirm password">
      <div class="submitbutton">
      <button type="submit">register</button>
    </div>
    </form>
  </div>`);


const loginForm = (
  `<div class="userForm userlogin">
    <div class="closebutton">
    <div>
      <i class="fas fa-times-circle fa-2x"></i>
      </div>
    </div>
    <h3>LOGIN AND GET STARTED</h3>
    <div class="userquestion"><p>Not a member yet?</p><button class="registerQuestion">register</button>
    </div>
    <div class="warning"></div>
    <form class="loginForm">
      <input type="text" name="username" placeholder="username">
      <input type="password" name="password" placeholder="password">
      <div class="submitbutton">
      <button type="submit">login</button>
    </div>
    </form>
  </div>`);

const createSmoothieTemplate = (
  `<div class="activitiesWrapper">
   <div class="smoothieform">
      <form id="createSmoothie">
      <div class="warning"></div>
         <div class="formSmoothieName">
            <label for="smoothieName">Smoothie Name</label>
            <input name="smoothieName" type="text">
         </div>
         <div>
            <label for="ingredients">Ingredients</label>
            <p>Each ingredient must include a number amount for how much of the ingredient should be used to make your recipe. This will help you and others to create the smoothie just like how you intended</p>
            <div class="ingredients">
               <div class="ingredient">
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
               </div>
               <div class="ingredient">
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
               </div>
               <div class="ingredient">
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
               </div>
            </div>
         </div>
         <div class="formbuttons">
            <a class="addmore">Add more ingredients</a>
            <button class="blendit" type="submit">Blend it!</button>
         </div>
      </form>
   </div>
</div>`
);

const editSmoothieTemplate = (
  `<div class="activitiesWrapper">
   <div class="smoothieform">
      <form id="editSmoothie">
         <div class="formSmoothieName">
            <label for="smoothieName">Smoothie Name</label>
            <input name="smoothieName" type="text">
         </div>
         <div>
            <label for="ingredients">Ingredients</label>
            <p>Each ingredient must include a number amount for how much of the ingredient should be used to make your recipe. This will help you and other to create the smoothie just like how you intended</p>
            <div class="ingredients">
              <textarea name="ingredients"></textarea>
            </div>
         </div>
         <div class="formbuttons">
            <button class="blendit" type="submit">Blend it!</button>
         </div>
      </form>
   </div>
</div>`)


const smoothieTemplate = (
  `<div class="smoothie">
    <h3 class="smoothieName">Smoothie Recipe</h3>
    <ul class="ingredientsList"></ul>
    <div class="deleteedit">
      <button class="delete">delete</button>
      <button class="update">update</button>
    </div>
  </div>`
);

const allSmoothiesTemplate = (
  `<div class="smoothie">
    <h3 class="smoothieName">Smoothie Recipe</h3>
    <ul class="ingredientsList"></ul>
  </div>`
);

const deleteWarningTemplate = (
  `<div class="deleteWarning">
      <h3>delete warning!</h3>
      <p>You're about to delete one of your smoothie creations! Are you sure you want to proceed?</p>
      <div class="deletebuttons">
         <button class="cancel">No! Go back!</button>
         <button class="proceed">Yes please!</button>
      </div>
   </div>`);
