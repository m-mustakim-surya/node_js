const fs = require('fs');

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

// Ambil semuda data di contacts.json
const loadContacts = () => {
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8')
  const contacts = JSON.parse(fileBuffer);
  return contacts;
}

// Cari contact berdasarkan id
const findContact = (id) => {
  const contacts = loadContacts();
  // Cek apakah ada idnya di contacts.json
  const isContact = contacts.find((contact)=>contact.id === id);
  return isContact;
}

// Menuliskan/menimpa file contacts.json dengan data baru
const saveContacts = (contacts) => {
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
}

// Menambahkan data contact baru
const addContact = (contact) => {
  const contacts = loadContacts();
  contacts.push(contact);
  saveContacts(contacts);
}

module.exports = {loadContacts, findContact, addContact};