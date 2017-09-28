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
        required: true,
        enum: ['positive', 'negative', 'action']
    },
    priority: {
        type: String,
        enum: ['Lowest', 'Low', 'Normal', 'High', 'Highest']
    },
    dueDate: {
        type: Date
    },
    responsible: {
        type: String
    },
    progress: {
        type: String,
        enum: ['ToDo', 'InProgress', 'InReview', 'Done']
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
    positiveNotes: {
        type: String
    },
    negativeNotes: {
        type: String
    },
    meetingDate: {
        type: Date,
    },
    participents: {
        type: String
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
const RetroModel = mongoose.model('Retro', RetroSchema)
const ItemModel = mongoose.model('Item', ItemSchema)

module.exports = {
    UserModel: UserModel,
    RetroModel: RetroModel,
    ItemModel: ItemModel
}