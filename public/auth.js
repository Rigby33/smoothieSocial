const REGISTER_URL = serverBase + 'auth/register';
const LOGIN_URL = serverBase + 'auth/login';

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

function signUp() {
  $('.register').on('click', function() {
    $('#userform').html(registrationForm);
  });
  $('#userform').on('submit', '#registerForm', function(event) {
    event.preventDefault();
    const username = $('[name=username]').val().trim();
    const password = $('[name=password]').val().trim();
    const firstName = $('[name=firstName]').val();
    const lastName = $('[name=lastName]').val();
    const newUser = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName
    };
    $.ajax({
      url: REGISTER_URL,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newUser)
    }).done(() => {
      console.log('you have been registered');
      $('#userform').html(loginForm);
    }).fail(err => {
      console.log(err);
    });
  });
}

function loadLoginForm() {
  $('.login').on('click', function() {
    $('#userform').html(loginForm);
  });
}

function isUserLoggedIn() {
  if(localStorage.getItem('userId')) {
    // hideRegisterLogin();
    displayCurrentRecipes();
  }
}

function hideRegisterLogin() {
  $('.register').hide();
  $('.login').hide();
}

function logIn() {
  $('#userform').on('submit', '#loginForm', function(event) {
    event.preventDefault();
    let userLogIn = {
      username: $('[name=username]').val(),
      password: $('[name=password]').val()
    }
    $.ajax({
      url: LOGIN_URL,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(userLogIn)
    }).done(response => {
      if(response == 'Username not found') {
        console.log('Username not found');
        return;
      }
      if(response == 'Password is incorrect') {
        console.log('Password is incorrect');
        return;
      }
      localStorage.setItem('tokenKey', response.token);
      localStorage.setItem('userId', response.userId);
      displayCurrentRecipes();
      console.log(response.userId);
      console.log(response.token);
      console.log('you have been logged in');
    }).fail(err => {
      console.log(err);
    });
  });
}
$(isUserLoggedIn);
$(logIn);
$(loadLoginForm);
$(signUp);
