const router = require("express").Router();
const User = require("../models/User.model")

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
router
    .route('/profile/edit/:id')
    .get( async (req, res) => { 
        
        let user = null

        try {

            user = await User.findById(req.params.id)
            if (!user) res.render('users/profile', { error: {type: "USER_ERROR", message: "User not found!" }})
            

        } catch (e) {
            error = { errType: "DB_ERR", message: e }

        } finally {

            switch(user.role) {
                case "adopter": res.render('adopters/edit-profile', { user })
                    break;
                case "shelter": res.render('shelters/edit-profile', { user })
                    break;
                default:        res.render('admin/control-panel', { user })
            }
        } 
    })
    .get( async (req, res) => { 
        
        // TO DO
    })


module.exports = router;
