var keythereum = require("keythereum");
var datadir = "./Ethereum";
var address= "24965a52d85b612bae2f80813683ff2ce126c12c";
const password = "";

var keyObject = keythereum.importFromFile(address, datadir);
var privateKey = keythereum.recover(password, keyObject);
console.log(privateKey.toString('hex'));
