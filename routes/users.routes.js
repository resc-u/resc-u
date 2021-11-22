const router = require("express").Router();
const User = require("../models/User.model")
const Adopter = require("../models/Adopter.model")
const Animal = require("../models/Animal.model.js")


// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config');


// GET /users ==> list of users
router
    .route('/')
    .get( async (req, res) => { 

        let listUsers = []
        let error = null
        
        try {
            listUsers = await User.find()
        } catch (e) {
            error = { errType: "DB_ERR", message: e }
        } finally {
            res.render('users/list', { users: listUsers, error })
        }
    })

// GET and POST /users/profile/edit/:id (sister routes)     
router.get('/profile/edit/:role/:id', async (req, res) => { 
        
    let user = null
    let { id, role } = req.params

    try {

        user = await User.findById(id)
        if (!user) res.render('users/profile', { error: {type: "USER_ERROR", message: "User not found!" }})
        
        // Logged user can only edit their own profile (unless they are admin!)
        //if (loggedInUser.role === 'admin' || loggedInUser.id === req.params.id) {
            /// TO DO WHEN WE ARE HANDLING THE SESSIONS
        //}

    } catch (e) {
        error = { errType: "DB_ERR", message: e }

    } finally {

        switch(role) {
            case "adopter": res.render('adopters/edit-profile', { user })
                break;
            case "shelter": res.render('shelters/edit-profile', { user })
                break;
            default:        res.render('admin/control-panel', { user })
        }
    } 
})

// Different routes for each role for "POST Edit Profile" (because the response is very different)

// POST /profile/edit/adopter/:id
router.post('/profile/edit/adopter/:id', async (req, res) => { 
        
    let { fullname, children, animalPreference, housingSize } = req.body

    if (!fullname) res.render(`profile/edit/adopter/${req.params.id}`, { error: {type: "FORM_ERROR", message: "Fullname is required." }})
        
    Adopter.findById(req.params.id)
            .then( (user) => {
                if (!user) res.render('adopters/edit-profile', { user, error: {type: "DB_ERROR", message: "Error in the DB" }})
                Adopter.findByIdAndUpdate(req.params.id, 
                                         { fullname, children, animalPreference, housingSize}, 
                                         { new: true })
                        .then( (updatedUser) => {
                            res.render(`adopters/profile`, { user: updatedUser, loggedInUser: updatedUser })
                        })
                        .catch( (e) => {
                            error = { errType: "DB_ERR", message: e }
                        })
            })
            .catch( (e) => {
                error = { errType: "DB_ERR", message: e }
            })     
    })


// GET /profile/:id
router.get('/profile/:role/:id', async (req, res) => {
    let user = null
    let { id, role } = req.params

    try {
        user = await User.findById(id)

    } catch (e) {
        error = { errType: "DB_ERR", message: e }
    } finally {

        switch(role) {
            case "adopter":  
                res.render('adopters/profile', {user, loggedInUser: user })
                break;
            case "shelter": 
                res.render('shelters/profile', {user, loggedInUser: user })
                break;
            default: isAdmin = true
          }
    }

 })  




module.exports = router;
