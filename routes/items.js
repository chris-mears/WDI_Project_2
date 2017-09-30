const express = require('express');
const router = express.Router({ mergeParams: true })
const Schema = require('../db/schema.js')
const UserModel = Schema.UserModel
const RetroModel = Schema.RetroModel



router.get('/new', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            res.render('items/usernew', {
                user: user,
                retro: retro
            })
        })
})

router.get('/useritem/new', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            res.render('items/usernew', {
                user: user,
                retro: retro
            })
        })
})

router.post('/create', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    const newItem = req.body

    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            retro.retroItems.push(newItem)
            return user.save()
        })
        .then(() => {
            res.redirect(`/${userName}/${retroId}`)
        })
        .catch((err) => {
            res.send(err);
        })
})

router.post('/useritem/create', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    const newItem = req.body

    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            retro.retroItems.push(newItem)
            return user.save()
        })
        .then(() => {
            res.redirect(`/${userName}`)
        })
        .catch((err) => {
            res.send(err);
        })
})

router.get('/:itemId/edit', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    const itemId = req.params.itemId

    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            const item = retro.retroItems.id(itemId)
            const due = item.dueDate.toISOString().substring(0, 10)

            res.render('items/edit', {
                user: user,
                retro: retro,
                item: item,
                due: due
            })
        })
        .catch((err) => {
            res.send(err);
        })
})

router.get('/:itemId/retroitem/edit', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    const itemId = req.params.itemId


    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            const item = retro.retroItems.id(itemId)
            const due = item.dueDate.toISOString().substring(0, 10)

            res.render('items/retroedit', {
                user: user,
                retro: retro,
                item: item,
                due: due
            })
        })
        .catch((err) => {
            res.send(err);
        })
})

router.get('/:itemId/useritem/edit', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    const itemId = req.params.itemId

    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            const item = retro.retroItems.id(itemId)
            const due = item.dueDate.toISOString().substring(0, 10)

            res.render('items/useredit', {
                user: user,
                retro: retro,
                item: item,
                due: due
            })
        })
        .catch((err) => {
            res.send(err);
        })
})

router.put('/:itemId/update', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    const itemId = req.params.itemId
    const updatedItem = req.body

    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            const item = retro.retroItems.id(itemId)
            item.title = updatedItem.title
            item.description = updatedItem.description
            item.priority = updatedItem.priority
            item.dueDate = updatedItem.dueDate
            item.responsible = updatedItem.responsible
            item.progress = updatedItem.progress
            return user.save()
        })
        .then(() => {
            res.redirect(`/${userName}/${retroId}/${itemId}`)
        })
        .catch((err) => {
            res.send(err);
        })
})

router.put('/:itemId/retro/update', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    const itemId = req.params.itemId
    const updatedItem = req.body

    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            const item = retro.retroItems.id(itemId)
            item.title = updatedItem.title
            item.description = updatedItem.description
            item.priority = updatedItem.priority
            item.dueDate = updatedItem.dueDate
            item.responsible = updatedItem.responsible
            item.progress = updatedItem.progress
            return user.save()
        })
        .then(() => {
            res.redirect(`/${userName}/${retroId}`)
        })
        .catch((err) => {
            res.send(err);
        })
})

router.put('/:itemId/user/update', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    const itemId = req.params.itemId
    const updatedItem = req.body

    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            const item = retro.retroItems.id(itemId)
            item.title = updatedItem.title
            item.description = updatedItem.description
            item.priority = updatedItem.priority
            item.dueDate = updatedItem.dueDate
            item.responsible = updatedItem.responsible
            item.progress = updatedItem.progress
            return user.save()
        })
        .then(() => {
            res.redirect(`/${userName}`)
        })
        .catch((err) => {
            res.send(err);
        })
})

router.get("/:itemId", (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    const itemId = req.params.itemId

    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            const item = retro.retroItems.id(itemId)
            const due = item.dueDate.toUTCString().substring(0, 17)
            res.render('items/show', {
                retro: retro,
                user: user,
                item: item,
                due: due
            })
        })
        .catch((err) => {
            res.send(err);
        })
})

router.get('/:itemId/delete', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    const itemId = req.params.itemId
    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            const item = retro.retroItems.id(itemId).remove()
            return user.save()
        })
        .then(() => {
            res.redirect(`/${userName}/${retroId}`)
        })
})

router.get('/:itemId/user/delete', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    const itemId = req.params.itemId
    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            const item = retro.retroItems.id(itemId).remove()
            return user.save()
        })
        .then(() => {
            res.redirect(`/${userName}`)
        })
})

module.exports = router;