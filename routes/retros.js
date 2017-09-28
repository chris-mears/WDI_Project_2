const express = require('express');
const router = express.Router({ mergeParams: true })
const Schema = require('../db/schema.js')
const UserModel = Schema.UserModel
const RetroModel = Schema.RetroModel

/* GET users listing. */
router.get('/', (req, res) => {
    const userName = req.params.username
    UserModel.findOne({ username: userName })
        .then((user) => {
            res.render('retros/index', {
                user: user
            })
        })
        .catch((err) => {
            res.send(err);
        })
});


router.get("/:retroId", (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId

    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            res.render('retros/show', {
                retro: retro,
                user: user
            })
        })
        .catch((err) => {
            res.send(err);
        })
})

module.exports = router;