const yargs = require("yargs");
const {simpanContact} = require("./contacts")

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

});

yargs.parse();