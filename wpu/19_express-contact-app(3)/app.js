const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {loadContacts, findContact, addContact, deleteContact, updateContact} = require('./utils/contacts')
const {v4: uuidv4}= require('uuid')
const {validationResult, check} = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

// konfigurasi flash
app.use(cookieParser('secret'))
app.use(session({
  cookie: {maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))
app.use(flash())

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
  ]
  res.render('index', {
    layout: 'layouts/main-layout',
    mahasiswa,
    title: 'Node JS Web Server',
  })
})

app.get('/contact', (req, res) => {
  const contacts = loadContacts();

  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contact',
    contacts,
    msg: req.flash('msg')
  })
})

// Form tambah data contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    layout: 'layouts/main-layout',
    title: 'Tambah Contact',
    id: uuidv4(),
  })
})

// Proses tambah data contact
app.post('/contact',[
  check('noHP', 'Nomor HP tidak valid!').isMobilePhone('id-ID'),
  check('email', 'Email tidak valid!').isEmail()
], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    // return res.status(400).json({errors: errors.array()});
    res.render('add-contact', {
      layout: 'layouts/main-layout',
      title: 'Tambah Contact',
      id: uuidv4(),
      errors: errors.array(),
    })
  } else{
    addContact(req.body);
    
    // kirimkan flash message
    req.flash('msg', 'Data contact berhasil ditambahkan!');
    res.redirect('/contact');
  }
})

// Form edit data contact
app.get('/contact/edit/:id', (req, res) => {
  const contact = findContact(req.params.id);

  res.render('edit-contact', {
    layout: 'layouts/main-layout',
    title: 'Edit Contact',
    contact
  })
})

// Proses edit contact
app.post('/contact/update', [
  check('noHP', 'Nomor HP tidak valid!').isMobilePhone('id-ID'),
  check('email', 'Email tidak valid!').isEmail()
  ], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      // return res.status(400).json({errors: errors.array()});
      res.render('edit-contact', {
        layout: 'layouts/main-layout',
        title: 'Edit Contact',
        errors: errors.array(),
        contact: req.body,
      })
    } else{
      updateContact(req.body);
      
      // kirimkan flash message
      req.flash('msg', 'Data contact berhasil diedit!');
      res.redirect('/contact');
    }
})

// Proses delete contact
app.get('/contact/delete/:id', (req, res) => {
  const contact = findContact(req.params.id);

  // Jika contact tidak ada
  if(!contact){
    res.status(404);
    res.send('<h1>404</h1>')
  } else{
    deleteContact(req.params.id)
    
    // kirimkan flash message
    req.flash('msg', 'Data contact berhasil dihapus!');
    res.redirect('/contact');
  }
})

// Halaman detail contact
app.get('/contact/:id', (req, res) => {
  const contact = findContact(req.params.id);

  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'Halaman Detail Contact',
    contact
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About',
  })
})

app.use((req, res) => {
  res.status(404)
  res.send('<h1>404 Page Not Found</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})