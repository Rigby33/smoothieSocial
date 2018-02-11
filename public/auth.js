const REGISTER_URL = serverBase + 'auth/register';
const LOGIN_URL = serverBase + 'auth/login';

function signUp() {
  $('.register').on('click', function() {
    $('.buttoncolumn > h1').hide();
    $('.register').hide();
    $('.login').show();
    $('.userform').show();
    $('.userform').html(registrationForm);
  });
  $('.userform').on('submit', '#registerForm', function(event) {
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
      $('.userform').html(loginForm);
    }).fail(err => {
      $('.warning').show();
      $('.warning').text(err.responseJSON.message);
      console.log(err.responseJSON.message);
    });
  });
}

function loadLoginForm() {
  $('.login').on('click', function() {
    $('.userform').html(loginForm);
    $('.buttoncolumn > h1').hide();
    $('.login').hide()
    $('.register').show();
    $('.userform').show();
  });
}

function loadUserActions() {
  $('.activities').html(loggedInActivities);
}

function isUserLoggedIn() {
  if(localStorage.getItem('userId')) {
    // hideRegisterLogin();
    // displayCurrentRecipes();
    loadUserActions();
    $('header').show();
    $('.herosection').hide();
    $('.viewallsmoothies').hide();
    $('.create').hide();
    $('.viewSmoothies').hide();
  } else {
    $('header').hide();
  }
}

function hideRegisterLogin() {
  $('.register').hide();
  $('.login').hide();
}

function logIn() {
  $('.herosection').on('submit', '#loginForm', function(event) {
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
      localStorage.setItem('tokenKey', response.token);
      localStorage.setItem('userId', response.userId);
      if(response == 'Username not found') {
        $('.warning').show();
        $('.warning').text('Username not found');
        console.log('Username not found');
        return;
      }
      if(response == 'Password is incorrect') {
        $('.warning').show();
        $('.warning').text('Password is incorrect');
        console.log('Password is incorrect');
        return;
      }
      loadUserActions();
      $('header').show();
      $('.herosection').hide();
      console.log('you have been logged in');
    }).fail(err => {
      console.log(err);
    });
  });
}

function logout() {
  $('.logout').on('click', () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    $('.activities').empty();
    $('#js-smoothies').empty();
    $('.herosection').show();
    $('header').hide();
  });
}

$(logout);
$(isUserLoggedIn);
$(logIn);
$(loadLoginForm);
$(signUp);
