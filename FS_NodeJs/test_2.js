// Incluindo o modulo fs
const fs = require("fs");

// Declarando o caminho do arquivo a ser criado
var path = 'Task1\\test.txt';


fs.writeFile(path, 'rs', function (err) {
    if (err) throw err;
    console.log('Arquivo Lido!');
});