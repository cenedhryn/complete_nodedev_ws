const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to write to server.log');
        }
    });
    next();
});

// UNCOMMENT WHEN IN MAINTENANCE MODE
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Friend!</h1>');
    // res.send({
    //     name: 'Anna-Karin',
    //     age: 41,
    //     status: 'tired',
    //     likes: ['reading', 'clening']
    // });
    res.render('home.hbs', {
        pageTitle: 'Homepage',
        welcomeMessage: 'Welcome to my site!'
    });
});

app.get('/about', (req, res) => {
    // res.send('<h1>Hello Friend!</h1>');
    // res.send({
    //     name: 'Anna-Karin',
    //     age: 41
    // });
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    // res.send('<h1>Hello Friend!</h1>');
    res.send({
        errorMessage: '<h1>Error</h1><p>There was an error showing the page.</p>'
    });

});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
