const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  // res.send('Hello World!')
  // res.json({
  //   nama: 'Takim Surya',
  //   email: 'takim@mail.com',
  //   noHP: '081234567890'
  // })
  res.sendFile('./index.html', {root: __dirname})
})

app.get('/contact', (req, res) => {
  // res.send('Siapa yang mau kamu kontak emang?')
  res.sendFile('./contact.html', {root: __dirname})
})

app.get('/project', (req, res) => {
  // res.send('Halaman about inih brow')
  res.sendFile('./project.html', {root: __dirname})
})

app.get('/product/:id', (req, res) => {
  res.send(`Product ID: + ${req.params.id} <br> Name: ${req.query.name}`)
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1>404 Page Not Found</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// const http = require('http');
// const fs = require('fs');

// const renderHTML = (path, res) => {
//     fs.readFile(path, (err, data)=> {
//         if(err){
//             res.writeHead(404);
//             res.write('Error file not found');
//         } else{
//             res.write(data);
//         }
//         res.end();
//     });
// }

// http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/html',
//     });

//     const url = req.url;
//     if(url === '/project'){
//         renderHTML('./project.html', res);
//     } else if( url === '/contact'){
//         renderHTML('./contact.html', res);
//     } else {
//         renderHTML('./index.html', res);
//     }
// }).listen(3000,() => {
//     console.log('Server is listening on port 3000...')
// });