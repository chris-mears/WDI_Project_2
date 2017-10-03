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
            })
        })
        .catch((err) => {
            res.send(err);
        })

});

//Route for login it when user enter username from homepage will take that value to search db and redirect to user page
router.post('/login', (req, res) => {
    const userName = req.body.username
    UserModel.findOne({ 'username': userName })
        .then((user) => {
            res.redirect(`/${user.username}`)
        })
        .catch((err) => {
            res.render("error", {
                message: "Can't Find User",
                error: err
            })
        })

})

//Route for user creation will create user in db and then redirect to user page
router.post('/new', (req, res) => {
    const newUser = req.body
    UserModel.create(newUser)
        .then((user) => {
            res.redirect(`/${user.username}`)
        })
        .catch((err) => {
            res.render("error", {
                message: "Username already exsist",
                error: err
            })
        })

})

module.exports = router;