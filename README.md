# smoothie social
***
[Live URL](#live-url) | [Summary of app](#summary-of-application) | [Technologies used](#technologies-used) | [RESTful API](#restful-api)
***

![Smoothie Social Logo](https://i.imgur.com/EakLHV8.png)

smoothie social is a app where users can create, save, view, and edit smoothie recipes. Once a user has logged in they can create a smoothie and view smoothies created by other smoothie social users.

## Live url
***
https://smoothie-social.herokuapp.com/

**demo username**: testuser

**demo password**: passwordpassword

## Summary of Application
***
When smoothie social loads the user is greeted with the logo and a little intro text about what a user can so with the app. A user can choose to register or if they are an exiting user the can log in. Users need to login to be able to use the app.

![smoothie social home screen image](https://i.imgur.com/5TGVovF.jpg)

![smoothie social register](https://i.imgur.com/Sbg9umO.jpg)

![smoothie social login](https://i.imgur.com/50c6YHG.jpg)

Once the user has logged in they can choose to view smoothies created by other other users, view their smoothie if they have created any, or create a new smoothie recipe.

![smoothie social activities view](https://i.imgur.com/s4Msv3o.jpg)

If the user selects create a smoothie then the view changes to an form. Here the user can enter the smoothie name and ingredients.

![smoothie social create view](https://i.imgur.com/6oPCeL1.jpg)

After clicking the "blend it!" button they are taken to see the smoothies that they have created. Here the user can click edit on any of their smoothies. They will have the ability to update their smoothies with more ingredients or fix anything they what.

![smoothie social my smoothies](https://i.imgur.com/gbyF934.jpg)

This is the view the user is greeted with if they select edit on any of their smoothie recipes.

## Technologies Used
***
### Front End
  - HTML5
  - CSS3
  - JQuery
  - JavaScript

## Back End
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

## RESTful API
***
### /smoothie endpoint

#### GET
returns smoothies created by all users

#### GET `/:id`
returns smoothie recipes created by a specific user

#### GET `/update/:recipeid`
returns a smoothie with a specific id

#### POST
create new smoothie recipe

#### PUT `/:recipeid`
updates recipe if recipe id in request body matches recipe id in params

#### DELETE `/:recipeid`
deletes recipe with id that matches params

***

### /auth endpoint

#### POST `/register`
registers new user

#### POST `/login`
logs user in and provides user with JWT
