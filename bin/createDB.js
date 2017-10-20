const mongoose = require('mongoose');
const config = require('../config/index');
mongoose.connect(config.mongoose.url, {useMongoClient: true});

const async = require('async');

let User;

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
], function (err) {
   if (err) throw err;
    else{
       console.log('DB recreate!!!');
       mongoose.disconnect();
   }
});

function open(callback){
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback){
    const db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    User = require('../models/user');
    callback();
}

function createUsers(callback){
    const username = 'admin';
    const password =  '12345';
    const newUser = new User();
    newUser.local.username = username;
    newUser.local.password = newUser.generateHash(password);
    newUser.save(callback);
}
