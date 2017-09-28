const express = require('express');
const router = express.Router();
const Schema = require('../db/schema.js')
const UserModel = Schema.UserModel
    /* GET home page. */
router.get('/', function(req, res, next) {
    UserModel.find({})
        .then((users) => {
            res.render('index', {
                title: `Retro'd`,
                users: users
            })
        })
        .catch((err) => {
            res.send(err);
        })

});


//Utilize to get login with username working
// router.post('/login', (req, res) => {
//     const userName = req.body.username
//     UserModel.match({ 'username': userName })
//         .then((user) => {
//             res.redirect(`/${user.username}`)
//         })
//         .catch((err) => {
//             console.log("Couldn't Find Username")
//         })

// })

module.exports = router;