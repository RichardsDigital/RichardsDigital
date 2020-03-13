const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(3000, () => {
    console.log("Lisening on port 3000");
});

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/portfolio', (req, res) => {
    res.render('portfolio');
});
app.get('/getting-started', (req, res) => {
    res.render('gettingStarted');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});

