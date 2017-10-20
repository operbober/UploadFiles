const fs = require('fs');
const config = require('../config');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: config.upload.dir, maxFilesSize : config.upload.maxSize });

const File = require('../models/file');

module.exports = (app, passport) => {

    app.get('/',  (req, res) => {
        res.render('index', {page: "Login Page",message: req.flash('loginMessage') })
    });

    app.get('/main', isLoggedIn, (req, res) => {
        File.find((err, files) => {
            res.render('main', {page: "Main Page", files: files})
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/main', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the login page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.post('/upload', isLoggedIn, multipartMiddleware, (req, res) => {
        if (req.files.upload.name) {
            console.log(req.files.upload.name + ' has been uploaded');
            const file = new File();
            file.name = req.files.upload.name;
            file.path = req.files.upload.path;
            file.type = req.files.upload.type;
            file.size = req.files.upload.size;
            file.save();
        } else {
            fs.unlink(req.files.upload.path)
        }
        res.redirect('/main')
    });

    app.get('/download/:id', isLoggedIn, (req, res) => {
        const {id} = req.params;
        File.findById(id, function(err, file) {
            const path = file.path;
            res.download(path);
        });

    });

    app.get('/remove/:id', isLoggedIn, (req, res) => {
        const {id} = req.params;
        File.findById(id, function(err, file) {
            fs.unlink(file.path, function(err) {
                console.log(file.name + ' has been deleted');
                file.remove((err) => {
                        res.redirect('/main')
                    }
                );
            });
        });

    })
};

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/')
};

