const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;

// Setup EJS
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

// Konfigurasi Flash
app.use(cookieParser('secret'))
app.use(session({
  cookie: {maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))
app.use(flash())

// Halaman Home
app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'Yoga Pratwanto',
      nim: '4611420001'
    },
    {
      nama: 'Calvin Nickholas',
      nim: '4611420002'
    },
    {
      nama: 'M. Mustakim Surya',
      nim: '4611420003'
    },
  ];
  res.render('index', {
    layout: 'layouts/main-layout',
    mahasiswa,
    title: 'Node JS Web Server',
  });
});

// Halaman About
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About',
  });
});

// Halaman Contact
app.get('/contact', async (req, res) => {
  const contacts = await Contact.find();

  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contact',
    contacts,
    msg: req.flash('msg')
  });
});

// Halaman detail contact
app.get('/contact/:id', async (req, res) => {
  const contact = await Contact.findOne({id: req.params.id});

  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'Halaman Detail Contact',
    contact
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact App | listeninng at http://localhost:${port}`)
});