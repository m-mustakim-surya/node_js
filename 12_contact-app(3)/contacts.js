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

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file);
    return contacts;
}

const simpanContact = (nama, email, nohp) => {
    const contact = {nama, email, nohp};
    
    const contacts = loadContact();
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
    
    console.log(chalk.cyan.inverse.bold(`Terima kasih sudah memasukkan data, ${nama}.`));
    
};

const listContact =() => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('Daftar Contact : '))
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama} - ${contact.nohp}`);
    });
}

const detailContact = (nama) => {
    const contacts = loadContact();
    // Cek apakah ada namanya di contacts.json
    const isContact = contacts.find((contact)=>contact.nama.toLowerCase() === nama.toLowerCase());
    if(isContact){
        console.log(chalk.cyan.inverse.bold(isContact.nama));
        console.log(isContact.nohp);
        if(isContact.email){
            console.log(isContact.email);
        }
    } else {
        console.log(chalk.red.inverse.bold(`Tidak ada contact dengan nama ${nama}`));
    }
}

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if(contacts.length === newContacts.length){
        console.log(chalk.red.inverse.bold(`Tidak ada contact dengan nama ${nama}`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    
    console.log(chalk.cyan.inverse.bold(`Contact ${nama} berhasil dihapus!`));


    // Cek apakah ada namanya di contacts.json
    // const isContact = contacts.find((contact)=>contact.nama.toLowerCase() === nama.toLowerCase());
    // if(isContact){
    //     const deletedContact = contacts.splice(contacts.indexOf(isContact), 1);
    //     console.log(deletedContact);
    // } else {
    //     console.log(chalk.red.inverse.bold(`Tidak ada nama ${nama} dalam daftar contact!`));
    // }
}

module.exports = {simpanContact, listContact, detailContact, deleteContact};