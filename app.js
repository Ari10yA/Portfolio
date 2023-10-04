const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;
require('dotenv').config();

const API_KEY = process.env.API_KEY;



const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(API_KEY);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('views', 'public');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    path: '/'
  });
});

app.get('/contact', (req, res) => {
  res.render('Contact/contact', {
    path: '/contact'
  });
});

app.post('/contact', (req, res, next) => {
  const {email, name, message} = req.body;

  console.log(email, name, message);

  const text = `From : ${email} , I am ${name}, ${message}`

  const msg = {
    to: 'khamruiaritya.2.3.5.ak@gmail.com', // Replace with your email address
    from: 'aritya_201900397@smit.smu.edu.in', // Replace with your SendGrid email
    subject: 'Inquiry',
    text: text,
  };

  sgMail.send(msg)
    .then(() => {
      console.log('Email sent');
      res.redirect('/contact');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error sending email');
    });
})

app.get('/projects', (req, res) => {
  res.render('Projects/project', {
    path: '/projects'
  });
});

app.get('/experience', (req, res) => {
  res.render('Experience/experience', {
    path: '/experience'
  });
});

app.get('/about', (req, res) => {
  res.render('AboutMe/about', {
    path: '/about'
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});