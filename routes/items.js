const express = require('express');
const router = express.Router({ mergeParams: true })
const Schema = require('../db/schema.js')
const UserModel = Schema.UserModel
const RetroModel = Schema.RetroModel


//Get route for Action Item Index
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


//Get route for New Action Item Form
router.get('/new', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            res.render('items/new', {
                user: user,
                retro: retro
            })
        })
})

//Post route for Action Item Creation
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
            //Utilizing express-back package to create dynamic redirect
            //Prevents me from having to create multiple routes to give user functionality to Items at all levels 
            return res.redirect(req.prevPrevPath)
        })
        .catch((err) => {
            res.send(err)
        })
})


//Get Route for Action Item Edit Form
router.get('/:itemId/edit', (req, res) => {
    const userName = req.params.username
    const retroId = req.params.retroId
    const itemId = req.params.itemId

    UserModel.findOne({ username: userName })
        .then((user) => {
            const retro = user.retros.id(retroId)
            const item = retro.retroItems.id(itemId)
                //Creating a date variable to format before passing to edit form
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

//Put route for Action Item Update
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
            //Utilizing express-back package to create dynamic redirect
            //Prevents me from having to create multiple routes to give user functionality to Items at all levels 
            return res.redirect(req.prevPrevPath)
        })
        .catch((err) => {
            res.send(err);
        })
})

//Delete Route for Action Item
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
            res.back()
        })
        .catch((err) => {
            res.send(err);
        })
})

module.exports = router;