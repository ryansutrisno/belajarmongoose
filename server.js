const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb+srv://admin:admin123@belajar-mongo-ptd1y.mongodb.net/test?retryWrites=true&w=majority', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Sudah konek database')
    }
});

app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res, next) {
    res.json('Selamat datang di halaman beranda')
});

let UserSchema = new mongoose.Schema({
    name: String,
    age: Number
});

let User = mongoose.model('User', UserSchema);

app.post('/create-user', function(req, res, next) {
    var user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.save(function(err) {
        if (err) console.log(err);
        res.json(user);
    });
});

app.listen(3000, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Server berjalan pada port 3000')
    }
});