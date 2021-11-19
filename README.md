# resc-u

Adopt an animal. Rescue yourself.

## Description

resc-u is an app for connecting animals in need of adoption with an adopter.

<!-- ## User Stories

- **homepage/login** - the page you see before logging in. Here you find a link to signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

### Logged in - adopter

- **profile** - The adopter sees page with their information & preferences and a small feed of animals.
- **profile edit** - .

### Logged in - shelter

- **profile** - Rescue centers have their own profile page with their details and a list of their animals
- **animal create** - As a user I want to create an event so that I can invite others to attend -->

<!-- ## Backlog

List of other features outside of the MVPs scope

User profile:

- see my profile
- upload my profile picture
- see other users profile
- list of events created by the user
- list events the user is attending

Geo Location:

- add geolocation to events when creating
- show event in a map in event detail page
- show all events in a map in the event list page

Homepage

- ...
 -->

## Pages:

| Route                     | Description                                         | Persmissions   |
| ------------------------- | --------------------------------------------------- | -------------- |
| **/users**                |                                                     |                |
| GET "/"                   | renders the homepage/login                          | All            |
| GET "/users/signup"       | renders the signup form for adopters, & admin       | Adopter, Admin |
| GET "/users/profile"      | shows profile page, different for each type of user | All            |
| GET "/users/profile/edit" | shows form to edit a profile                        | All            |
| **/shelters**             |                                                     |                |
| GET "/shelters/animals"   | shows list of animals of this shelter               | All            |
| **/animals**              |                                                     |                |
| GET "/animals"            | shows a list of animals up for adoption             | All            |
| GET "/animals/:id"        | shows an animals individual page                    | All            |
| GET "/animals/new"        | shows form to add a new animal                      | Shelter, Admin |
| GET "/animals/edit/:id"   | shows an animals individual page                    | All            |

## CRUD Routes:

| Route                      | Description                                                                    | Persmissions   |
| -------------------------- | ------------------------------------------------------------------------------ | -------------- |
| **/users**                 |                                                                                |                |
| GET "/users/delete/:id"    | deletes a user                                                                 | Adopter, Admin |
| POST "/users/signup"       | creates a new user passes email, username, password. Redirects to edit profile | All            |
| POST "/users/profile/edit" | edits an adopters' or shelters' profile info                                   | Adopter, Admin |
| **/animals**               |                                                                                |                |
| POST "/animals/new"        | creates a new animal                                                           | Shelter, Admin |
| POST "/animals/edit/:id"   | updates an existing animal                                                     | Shelter, Admin |
| GET "/animals/delete/:id"  | deletes an animal                                                              | Shelter, Admin |

## Models

User model

```
username: String
email: String
password: String
role: { type: String, required: true, enum: [
  "admin", "adopter", "shelter"
] }
```

Animal model

```
name: { type: String, required: true},
type: { type: String, required: true},
sex: { type: String, required: true},
medidas: { type: Number},
age: {type: Number},
status: {type: String},
date: { type: String, default: Date },
color: {type: String},
race: {type: String},
dateofbirth: { type: String, default: Date },
description: {type: String},
dateofentry:   { type: String, default: Date },
picture: {type: String},
location: {type: String},
children: {type: String},
center: {type: Schema.Types.ObjectId, ref: "Shelter"}
```

## Links

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
