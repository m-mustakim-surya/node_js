const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

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

const simpanContact = (nama, email, nohp) => {
    const contact = {nama, email, nohp};
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file);
    
    // Cek duplikat
    const duplikat = contacts.find((contact)=>contact.email === email);
    if(duplikat){
        console.log(chalk.red.inverse.bold('Email sudah terdaftar, gunakan email lain!'));
        return false;
    }

    // Cek email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email tidak valid!'));
            return false;
        }
    }

    // Cek nomor HP
    if(nohp){
        if(!validator.isMobilePhone(nohp, 'id-ID')){
            console.log(chalk.red.inverse.bold('Nomor HP tidak valid!'));
            return false;
        }
    }

    contacts.push(contact);
    
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    
    console.log(chalk.green.inverse.bold(`Terima kasih sudah memasukkan data, ${nama}.`));
    
};

module.exports = {simpanContact};