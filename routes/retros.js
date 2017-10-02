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
                user: user,
                userName: userName
            })
        })
        .catch((err) => {
            res.send(err);
        })
});

router.get('/new', (req, res) => {
    const userName = req.params.username
    res.render('retros/new', {
        userName: userName
    })
})

router.post('/', (req, res) => {
    const userName = req.params.username
    const newRetro = req.body

    UserModel.findOne({ username: userName })
        .then((user) => {
            user.retros.push(newRetro)
            return user.save()
        })
        .then(() => {
            res.redirect(`/${userName}`)
        })
        .catch((err) => {
            res.send(err);
        })
})

router.get('/:retroId/edit', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId

    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            let meetDate = retro.meetingDate
            if (meetDate !== null) {
                meetDate = retro.meetingDate.toISOString().substring(0, 10)
            }
            res.render('retros/edit', {
                user: user,
                retro: retro,
                meetDate: meetDate
            })
        })
})

router.put('/:retroId', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    const updatedRetro = req.body

    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            retro.title = updatedRetro.title
            retro.description = updatedRetro.description
            retro.positiveNotes = updatedRetro.positiveNotes
            retro.negativeNotes = updatedRetro.negativeNotes
            retro.completed = updatedRetro.completed
            retro.participants = updatedRetro.participants
            retro.meetingDate = updatedRetro.meetingDate
            return user.save()
        })
        .then(() => {
            res.redirect(`/${userName}/${retroId}`)
        })
})

router.get("/:retroId", (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId

    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            res.render('retros/show', {
                retro: retro,
                user: user,
            })
        })
        .catch((err) => {
            res.send(err);
        })
})

router.get('/:retroId/delete', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId).remove()
            return user.save()
        })
        .then(() => {
            res.redirect(`/${userName}`)
        })
})

module.exports = router;