const yargs = require("yargs");
const {simpanContact, listContact, detailContact, deleteContact} = require("./contacts")

yargs.command({
    command: 'add',
    describe: 'Menambah contact baru',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        nohp: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv){
        simpanContact(argv.nama, argv.email, argv.nohp);
    }
}).demandCommand();

// Menampilkan daftar semua nama & nomor HP contact
yargs.command({
    command: 'list',
    describe: 'List nama & no HP contact',
    handler(){
        listContact();
    }
})

// Menampilkan detail suatu contact berdasarkan nama
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        detailContact(argv.nama);
    }
})

// Menghapus suatu contact berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        deleteContact(argv.nama);
    }
})

yargs.parse();