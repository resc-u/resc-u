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

module.exports = router;
