const express = require('express');
const router = express.Router({ mergeParams: true })
const Schema = require('../db/schema.js')
const UserModel = Schema.UserModel
const RetroModel = Schema.RetroModel

router.get("/", (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    const itemId = req.params.itemId

    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            const item = retro.retroItems.id(itemId)
            res.render('items/show', {
                retro: retro,
                user: user,
                item: item
            })
        })
        .catch((err) => {
            res.send(err);
        })
})

module.exports = router;