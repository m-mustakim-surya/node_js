const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const app = express()
const port = 3000

// Gunakan ejs
app.set('view engine', 'ejs')

// Third-party middleware
app.use(expressLayouts)
app.use(morgan('dev'))

// Built-in middleware
app.use(express.static('public'))

// Application level middleware
app.use((req, res, next) => {
  console.log('Time: ' + Date.now())
  next()
})

app.get('/', (req, res) => {
  // res.sendFile('./index.html', {root: __dirname})
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
  // res.sendFile('./contact.html', {root: __dirname})
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contact',
    nama: 'Pakde',
  })
})

app.get('/about', (req, res) => {
  // res.sendFile('./about.html', {root: __dirname})
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About',
  })
})

app.get('/product/:id', (req, res) => {
  res.send(`Product ID: + ${req.params.id} <br> Name: ${req.query.name}`)
})

app.use((req, res) => {
  res.status(404)
  res.send('<h1>404 Page Not Found</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})