# resc-u

Adopt an animal. Rescue yourself.

## Description

resc-u is an app for connecting animals in need of adoption with an adopter.

## User Stories

There are 3 types of user: the adopter, the shelter, and the admin.

### Adopter
- An adopter's user flow will be as follows: They register, or log in if they have already an account. They see their profile page, where they can edit their adopter profile, their preferences, and also see their favorite animals, as well as the animals that are "a match" regarding her preferences. They can see a list of the animals awaiting adoption, sort them, filter them by their preferences, visit an animal's profile page, read the adoption information, and the shelter's contact information. 

### Shelter
- A shelter can log in in Resc-u with the credentials created previously by us, the admin. They can add (create new) animals in the application, and see their full list of animals later on. They can also visit any adopter's profile pages. 

### Admin
- The admin is us, the developers of the app, who can view, edit, and delete everything in the application. 


<!--

 ## Backlog

List of other features outside of the MVPs scope

User profile:

- see my profile
- upload my profile picture
- see other users profile
- list of events created by the user
- list events the user is attending

 -->

## Pages:

| Route                     | Description                                         | Persmissions   |
| ------------------------- | --------------------------------------------------- | -------------- |
| **/users**                |                                                     |                |
| GET "/"                   | renders the homepage/login                          | All            |
| GET "/signup"             | renders the signup form for adopters, & admin       | Adopter, Admin |
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
| POST "/signup"       | creates a new user passes email, username, password. Redirects to edit profile | All            |
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
