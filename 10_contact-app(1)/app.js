const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Membuat folder data bila tidak ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

// Membuat file contacts.json bila tidak ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, rejects) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama);
        });
    })
};

// const pertanyaan2 = () => {
//     return new Promise((resolve, rejects) => {
//         rl.question('Masukkan email anda : ', (email) => {
//             resolve(email);
//         });
//     })
// };

// const pertanyaan3 = () => {
//     return new Promise((resolve, rejects) => {
//         rl.question('Masukkan nomor HP anda : ', (noHP) => {
//             resolve(noHP);
//         });
//     })
// };

const main = async () => {
    const nama = await tulisPertanyaan('Masukkan nama anda : ');
    const email = await tulisPertanyaan('Masukkan email anda : ');
    const noHP = await tulisPertanyaan('Masukkan nomor HP anda : ');
    
    const contact = {nama: nama, email: email, noHP: noHP};
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file);
    
    contacts.push(contact);
    
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    
    console.log(`Terima kasih sudah memasukkan data, ${nama}.`);
    
    rl.close();
}

main();
