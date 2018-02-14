const REGISTER_URL = serverBase + 'auth/register';
const LOGIN_URL = serverBase + 'auth/login';

function signUp() {
  $('body').on('click', '.register, .registerQuestion', function() {
    $('.userFormWrapper').show();
    $('.userFormWrapper').html(registrationForm);
    closeButton();
  });
  $('.userFormWrapper').on('submit', '.registrationForm', function(event) {
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
      $('.userFormWrapper').html(loginForm);
    }).fail(err => {
      $('.warning').show();
      $('.warning').text(err.responseJSON.message);
      console.log(err.responseJSON.message);
    });
  });
}

function closeButton() {
  $('.userFormWrapper').on('click', '.closebutton > div', event => {
    $('.userFormWrapper').hide();
    console.log('hi');
  });
}

function logIn() {
  $('body').on('click', '.login, .loginQuestion', event => {
    $('.userFormWrapper').show();
    $('.userFormWrapper').html(loginForm);
    closeButton();
  });
  $('body').on('submit', '.loginForm', function(event) {
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
      $('.userFormWrapper').hide();
      fadeInIfLoggedIn();
      loadUserActions();
      $('header').show();
      $('header').html(headerTemplate);
      $('.activities').show();
      $('.activities').html(loggedInActivities);
      $('.herosection').hide();
      // loadUserActions();
      // $('header').show();
      // $('header').html(headerTemplate);
      // $('.herosection').hide();
      console.log('you have been logged in');
    }).fail(err => {
      console.log(err);
    });
  });  
}

// function loadLoginForm() {
//   $('.login').on('click', function() {
//     $('.userform').html(loginForm);
//     $('.buttoncolumn > h1').hide();
//     $('.login').hide()
//     $('.register').show();
//     $('.userform').show();
//   });
// }

function loadUserActions() {
  $('main').hide();
}

function fadeInIfLoggedIn() {
  $('.fadeinsecond').fadeIn(800);
}

function isUserLoggedIn() {
  if(localStorage.getItem('userId')) {
    // hideRegisterLogin();
    // displayCurrentRecipes();
    fadeInIfLoggedIn();
    loadUserActions();
    $('header').show();
    $('header').html(headerTemplate);
    $('.activities').show();
    $('.activities').html(loggedInActivities);
    $('.herosection').hide();
  }
}

// function hideRegisterLogin() {
//   $('.register').hide();
//   $('.login').hide();
// }

// function logIn() {
//   $('.herosection').on('submit', '#loginForm', function(event) {
//     event.preventDefault();
//     let userLogIn = {
//       username: $('[name=username]').val(),
//       password: $('[name=password]').val()
//     }
//     $.ajax({
//       url: LOGIN_URL,
//       type: 'POST',
//       contentType: 'application/json',
//       data: JSON.stringify(userLogIn)
//     }).done(response => {
//       localStorage.setItem('tokenKey', response.token);
//       localStorage.setItem('userId', response.userId);
//       if(response == 'Username not found') {
//         $('.warning').show();
//         $('.warning').text('Username not found');
//         console.log('Username not found');
//         return;
//       }
//       if(response == 'Password is incorrect') {
//         $('.warning').show();
//         $('.warning').text('Password is incorrect');
//         console.log('Password is incorrect');
//         return;
//       }
//       loadUserActions();
//       $('header').show();
//       $('.herosection').hide();
//       console.log('you have been logged in');
//     }).fail(err => {
//       console.log(err);
//     });
//   });
// }

function logout() {
  $('body').on('click', '.logout', () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    $('.activities').hide();
    $('main').show();
    // $('#js-smoothies').empty();
    $('.herosection').show();
    $('header').hide();
  });
}

$(logout);
$(isUserLoggedIn);
$(logIn);
// $(loadLoginForm);
$(signUp);
