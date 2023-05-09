// Core Modules
// File System
const fs = require('fs');

// Menuliskan string ke file (synchronous)
// try {
//     fs.writeFileSync('data/test.txt', 'Hello World singkrongnums!');
// } catch(err){
//     console.log(err);
// }

// Menuliskan string ke file (asynchronous)
// fs.writeFile('test.txt', 'Hello Async', (err) => {
//     console.log(err);
// });

// Read file async
// fs.readFile('test.txt', 'utf-8',(err, data)=>{
//     if(err) throw err;
//     console.log(data);
// })

// Readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Masukkan nama anda : ', (nama) => {
    rl.question('Masukkan nomor hp anda : ', (noHP) => {
        const contact = {nama: nama, noHP: noHP};
        const file = fs.readFileSync('data/contacts.json', 'utf-8')
        const contacts = JSON.parse(file);
        
        contacts.push(contact);
        
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

        console.log(`Terima kasih ${nama}`);

        rl.close();
    });
});