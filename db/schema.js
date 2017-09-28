const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    priority: {
        type: String
    },
    dueDate: {
        type: Date
    },
    responsible: {
        type: String
    }
    progress: {
        type: String
    }

})

const RetroSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    meetingDate: {
        type: Date,
    },
    participents: {
        type: Array
    },
    retroItems: [ItemSchema]
})


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    retros: [RetroSchema]
})

const UserModel = mongoose.model('User', UserSchema)
const RetroModel = mongoose.model('Retro', RetroModel)
const ItemModel = mongoose.model('Item', ItemSchema)