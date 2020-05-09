const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();
const sslRedirect = require('heroku-ssl-redirect');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(sslRedirect());

app.listen(process.env.PORT || 3000);

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

app.post('/contact', (req, res) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: req.body.mail,
        to: 'richardsdigital.info@gmail.com',
        subject: req.body.subject,
        text: `From: ${req.body.mail} | ${req.body.message}`
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log(err);
            res.render('contact-unsuccessful');
        } else {
            res.render('contact-success');
        }
    });

});

