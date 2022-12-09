const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session")
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use(session({
    secret: 'Thereisnofatebutwhatumake',
    resave: false,
    saveUninitialized: false
}))

const animalController = require('./controllers/animals.js')
app.use('/animals', animalController)

const usersController = require('./controllers/user.js');
app.use('/users', usersController);

const sessionController = require('./controllers/session.js');
app.use('/session', sessionController);

mongoose.connect('mongodb://localhost:27017/animals', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    console.log('connected to mongoose...');
})
app.listen(3004, () => {
    console.log('Listening on port 3004...')
})
