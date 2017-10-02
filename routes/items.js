const express = require('express');
const router = express.Router({ mergeParams: true })
const Schema = require('../db/schema.js')
const UserModel = Schema.UserModel
const RetroModel = Schema.RetroModel



router.get("/", (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId

    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            res.render('items/index', {
                retro: retro,
                user: user,
            })
        })
        .catch((err) => {
            res.send(err);
        })
})

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

router.get('/retroitem/new', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            res.render('items/retronew', {
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
            res.redirect(`/${userName}/${retroId}/item`)
        })
        .catch((err) => {
            res.send(err);
        })
})

router.post('/retroitem/create', (req, res) => {
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
            let due = item.dueDate
            if (due !== null) {
                due = item.dueDate.toISOString().substring(0, 10)
            }

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
            let due = item.dueDate
            if (due !== null) {
                due = item.dueDate.toISOString().substring(0, 10)
            }

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
            let due = item.dueDate
            if (due !== null) {
                due = item.dueDate.toISOString().substring(0, 10)
            }

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
            item.completed = updatedItem.completed
            return user.save()
        })
        .then(() => {
            res.redirect(`/${userName}/${retroId}/item`)
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
            item.completed = updatedItem.completed
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
            item.completed = updatedItem.completed
            return user.save()
        })
        .then(() => {
            res.redirect(`/${userName}`)
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
            res.redirect(`/${userName}/${retroId}/item`)
        })
})

router.get('/:itemId/retro/delete', (req, res) => {
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