require('dotenv').config();

const mongoose = require('mongoose');
const Schema = require("./schema.js");

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function(err) {
    console.log(err);
});

// Will log "database has been connected" if it successfully connects.
db.once('open', function() {
    console.log("database has been connected!");
});

const UserModel = Schema.UserModel
const RetroModel = Schema.RetroModel
const ItemModel = Schema.ItemModel

UserModel.remove({}, function(err) {
    console.log(err);
})

const chris = new UserModel({ name: 'Chris Mears', username: "nightmears" })
const trisha = new UserModel({ name: 'Trisha Schinner', username: "macy_miller" })

const project_one = new RetroModel({
    title: "Project 1",
    description: "Marfa disrupt skateboard wolf wayfarers scenester Blue Bottle tattooed YOLO hella occupy cardigan banh mi Odd Future messenger bag Godard Schlitz fashion axe freegan Bushwick gentrify meggings butcher drinking vinegar Wes Anderson narwhal readymade Vice salvia Intelligentsia",
    positiveNotes: 'Good functionality',
    negativeNotes: 'CSS needs work',
    meetingDate: new Date(),
    participents: "chris, blake"
})
const sprint_fuzzybunny = new RetroModel({
    title: "Sprint: Fuzzy Bunny",
    description: "Marfa disrupt skateboard wolf wayfarers scenester Blue Bottle tattooed YOLO hella occupy cardigan banh mi Odd Future messenger bag Godard Schlitz fashion axe freegan Bushwick gentrify meggings butcher drinking vinegar Wes Anderson narwhal readymade Vice salvia Intelligentsia",
    positiveNotes: 'Good workflow',
    negativeNotes: 'Account Managers blew us up',
    meetingDate: new Date(),
    participents: "chris, Tom"
})
const client_review = new RetroModel({
    title: "Site Review with Client",
    description: "ennui photo booth paleo pop-up ethical PBR roof party polaroid pickled tattooed viral tote bag Echo Park master cleanse Bushwick salvia Pinterest Carles Kickstarter put a bird on it leggings 3 wolf moon mustache Pitchfork hoodie selfies mumblecore literally dreamcatcher art party Shoreditch sustainable meggings tofu artisan seitan +1 tousled Portland scenester synth stumptown aesthetic Blue",
    positiveNotes: 'Good layout',
    negativeNotes: 'Confusing Sign up functionality',
    meetingDate: new Date(),
    participents: "Trisha, Robert"
})

const action_item_project = new ItemModel({
    title: 'Update CSS',
    description: '3 wolf moon mustache Pitchfork hoodie selfies mumblecore literally dreamcatcher art party Shoreditch sustainable meggings tofu artisan seitan',
    type: 'action',
    priority: 'Highest',
    dueDate: new Date("October 13, 2017"),
    responsible: 'Chris',
    progress: 'ToDo'
})
const action_item_two_project = new ItemModel({
    title: 'Party',
    description: 'art party Shoreditch sustainable meggings tofu artisan seitan',
    type: 'action',
    priority: 'Low',
    dueDate: new Date("October 14, 2017"),
    responsible: 'Chris',
    progress: 'ToDo'
})
const action_item_sprint = new ItemModel({
    title: 'Fire Account Manager',
    description: 'hella occupy cardigan banh mi Odd Future messenger bag Godard Schlitze',
    type: 'action',
    priority: 'Highest',
    dueDate: new Date("September 30, 2017"),
    responsible: 'Chris',
    progress: 'ToDo'
})

const action_item_review = new ItemModel({
    title: 'Refactor sign up functionality',
    description: 'Pitchfork hoodie selfies mumblecore literally dreamcatcher art party Shoreditch sustainable meggings tofu artisan seitan +1 tousled Portland scenester synth stumptown',
    type: 'action',
    priority: 'Highest',
    dueDate: new Date("October 3, 2017"),
    responsible: 'Trisha',
    progress: 'ToDo'
})



project_one.retroItems = [action_item_project, action_item_two_project]

sprint_fuzzybunny.retroItems = [action_item_sprint]

client_review.retroItems = [action_item_review]

chris.retros = [project_one, sprint_fuzzybunny]

trisha.retros = [client_review]

const users = [chris, trisha]

users.forEach((user) => {
    user.save()
        .then((user) => {
            console.log(`${user.name} saved!`)
        })
        .catch((err) => {
            console.log(err)
        })
})
db.close();